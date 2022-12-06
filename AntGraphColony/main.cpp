#include <fstream>
#include <iostream>
#include <vector>
#include <string>
#include <iomanip>
#include <queue>
#include <cmath>
#include <ctime>
#include <cstdlib>
#include <string>
#include <pqxx/pqxx>

const auto MAX = UINT_MAX;
int amount_of_verticles = 0;
typedef unsigned vert;
typedef double weight_t;
typedef std::vector<std::vector<weight_t>> Matrix;
typedef std::vector<vert> Path;
typedef Path Vertex_vec;
std::vector<std::pair<Path, double>> extended_routes;

//сравнение векторов
int vec_compare(Path a, const std::pair<Path, double>& b) {
	
	//если длина путей не совпадает
	if (a.size() != b.first.size())
		return 0;

	int length = a.size();
	int comparer = 0;
	//иначе поэлементое сравнение векторов
	for (int i = 0; i < length; i++) {
		if (a[i] == b.first[i]) {
			comparer++;
		}
	}

	//вектора совпали
	if (comparer == length) {
		return 1;
	}
	//вектора не совпали
	else {
		return 0;
	}
}

//добавление пути
void add_route(Path candidate, double length) {
	int comparer = 0;
	int res = 0;

	//проверка на наличие пути в уже записанных
	for (int i = 0; i < extended_routes.size(); i++) {
		res = vec_compare(candidate, extended_routes[i]);
		if (res == 1) {
			comparer++;
		}
	}

	//добавление пути
	if (comparer == 0) {
		extended_routes.push_back(std::make_pair(candidate, length));
	}

}

//сортировка путей по возрастанию параметра поиска
bool sortbysec(const std::pair<Path, double>& a, const std::pair<Path, double>& b)
{
	return (a.second < b.second);
}

class Graph
{
	size_t num_vertices; // Количество вершин
	Matrix graph_matrix; // Матрица графа
	Matrix pheromone;    // Матрица феромонов
	vert goal_vert;		 // Вершина назначения

public:

	Graph(unsigned int mode) {

		unsigned from, to;
		double weight;

		//работа с базой данных
		std::string connectionString = "host=localhost port=5432 dbname=trpo user=postgres password =admin";
		try
		{
			pqxx::connection connectionObject(connectionString.c_str());
			pqxx::work worker(connectionObject);
			//получение городов
			pqxx::result response = worker.exec("SELECT * FROM cities ORDER BY id");;
			this->num_vertices = response.size();
			amount_of_verticles = this->num_vertices;
			this->graph_matrix = std::vector<std::vector<weight_t>>(this->num_vertices, std::vector<weight_t>(this->num_vertices, MAX));
			//обнуление всего графа
			for (int i = 0; i < this->num_vertices; i++)
				for (int j = 0; j < this->num_vertices; j++)
					this->graph_matrix[i][j] = 0;

			//получение маршрутов
			response = worker.exec("SELECT * FROM routes ORDER BY id");
			int i = 0;
			//задание матрицы смежности
			for (size_t k = 0; k < response.size(); k++)
			{
				from = atoi(response[k][1].c_str()) - 1;
				to = atoi(response[k][2].c_str()) - 1;
				//режим для двух параметров
				if (mode == 2)
					weight = atof(response[k][7].c_str());
				//режим для одного параметра
				else
					weight = (mode == 0) ? atoi(response[k][3].c_str()) : atoi(response[k][4].c_str());
				this->add_edge(from, to, weight);

			}

			connectionObject.close();
		}
		catch (const std::exception& e)
		{
			std::cerr << e.what() << std::endl;
		}

		//обнуление диагонали матрицы смежности
		for (unsigned i = 0; i < this->num_vertices; ++i)
			this->graph_matrix[i][i] = 0;
	}

	void add_edge(vert from, vert to, weight_t weight) {
		graph_matrix[from][to] = weight;
	}

	//расчёт обратной матрицы
	Matrix get_reverse() const {
		auto reverse_matrix = graph_matrix;
		for (unsigned i = 0; i < num_vertices; ++i) {
			for (unsigned j = 0; j < num_vertices; ++j) {
				if (reverse_matrix[i][j] == MAX) {
					reverse_matrix[i][j] = 0;
					continue;
				}
				if (i != j)
					reverse_matrix[i][j] = 1 / reverse_matrix[i][j];
			}
		}
		return reverse_matrix;
	}

	// Муравьиный алгоритм
	class Ant
	{
	public:
		Path path;				   // Маршрут муравья (Tk)
		std::vector<bool> visited; // Посещенные вершины
		weight_t len;			   // Длина маршрута 

		//конструктор
		Ant(vert start, unsigned num_ver = amount_of_verticles) : path(1, start), len(0) {
			visited = std::vector<bool>(num_ver, false);
			visited[start] = true;
		}

		//удаление муравья
		void delete_ant()
		{
			path.clear();
			len = 0;
		}

		bool find(vert vertex) {
			// Если дошли до конца и не нашли -> false, 
			// не дошли до конца/нашли -> true
			return visited[vertex];
		}

		//получение индекса последней посещённой вершины
		vert lastVertex() { return path.back(); }

		//добавление вершины в путь муравья
		void add_vertex(vert vertex, weight_t weight) {
			visited[vertex] = true;
			if (weight != MAX)
				len += weight;
			path.push_back(vertex);
		}

		//добавление феромона на дуги
		void add_pheromone(Matrix& pheromone, double Q) {
			if (!path.empty()) {
				for (unsigned i = 0; i < path.size() - 1; ++i)
					pheromone[path[i]][path[i + 1]] += Q / len;
			}
		}
	};


	// Выбор вершины с заданными вероятностями
	vert choose_vertex(Ant& ant, Matrix& reverse_matrix, const double alpha, const double betta) {
		auto current = ant.lastVertex(); //получение последней посещенной вершины
		auto un_vertices = unvisited_neighbours(current, ant); //получение вектора соседей
		//вектор вероятностей перехода из текущей вершины в соседние
		auto chance = probability(pheromone, reverse_matrix, current, un_vertices, alpha, betta);
		//получение случайного числа в [0,1]
		const auto random_number = (std::rand()) / static_cast<double>(RAND_MAX);
		
		vert good_vertex_rand = MAX;
		double sum_chance = 0.0;
		//определение, какую вершину из соседей выбрать следующей
		for (unsigned i = 0; i < chance.size(); ++i) {
			//если суммарная вероятность не больше случайного числа
			if (sum_chance <= random_number)
				good_vertex_rand = un_vertices[i];//запомнить i-ого соседа как выбранного

			sum_chance += chance[i]; //прибавить веротяность перехода в i-ого соседа к общей
		}
		return good_vertex_rand;
	}

	//поиск непосещенных соседей
	Vertex_vec unvisited_neighbours(vert& current, Ant& ant) {
		std::vector<vert> neigh_vec;
		//проход по вершинами
		for (unsigned i = 0; i < num_vertices; ++i) {
			//вес текущей дуги больше 0, то есть путь имеется между текущей вершиной и i-ой
			//а текущая вершина не совпадает с i-той и муравей еще не былой в i-той
			if (graph_matrix[current][i] < MAX && graph_matrix[current][i] > 0 && current != i && !ant.find(i))
				neigh_vec.push_back(i);
		}
		return neigh_vec;
	}

	//вероятность перехода муравья из вершины i в вершину j
	std::vector<double> probability(Matrix& pheromone, Matrix& reverse, vert current,
		Vertex_vec& un_vertices, double alpha, double betta) {
		//шансы попадания в каждую смежную вершину
		std::vector<double> chance = std::vector<double>(un_vertices.size());;
		//подсчет вероятности попадания в каждую вершину
		auto sum = 0.0;
		for (auto un_vert : un_vertices) //подсчет знаменталя функции
			sum += pow(pheromone[current][un_vert], alpha) * pow(reverse[current][un_vert], betta);
		for (unsigned i = 0; i < un_vertices.size(); ++i) //расчёт формулы
			chance[i] = pow(pheromone[current][un_vertices[i]], alpha) * pow(reverse[current][un_vertices[i]], betta) / sum;
		// Возвращаем вероятности
		return chance;
	}

	//задание матрицы феромонов
	void reset_pheromone() {
		pheromone = Matrix(num_vertices, std::vector<weight_t>(num_vertices, 0.0));
		for (int i = 0; i < num_vertices; i++)
			for (int j = 0; j < num_vertices; j++) {
				if (graph_matrix[i][j] > 0)
					pheromone[i][j] = 1.0;
			}
		for (unsigned i = 0; i < num_vertices; ++i) pheromone[i][i] = 0.0;
	}

	void ant_algorithm(vert start, vert goal, unsigned ticks) {
		if (start >= num_vertices || goal_vert >= num_vertices)
			return;
		Path tpath;
		goal_vert = goal;
		srand(time(nullptr));
		// Коэффициенты жадности и стадности алгоритма
		const double alpha = 0.9;
		const double betta = 0.1;
		// Количество феромона
		const double Q = 10;
		// Количество муравьев в колонии
		const unsigned M = 100;
		// Коэффициент испарения
		const double p = 0.1;

		static auto reverse_matrix = this->get_reverse();

		// Цикл по всем итерациям
		for (unsigned k = 0; k < ticks; ++k) {
			// Задание муравьев
			std::vector<Ant> ants(M, Ant(start));

			// Цикл по всем муравьям
			for (unsigned i = 0; i < M; ++i) {
				vert good_vertex;
				// Цикл прохода муравья по графу
				do {
					// Выбор вершины
					good_vertex = choose_vertex(ants[i], reverse_matrix, alpha, betta);
					// Если муравей оказался в тупике
					if (good_vertex == MAX) {
						ants[i].delete_ant();
						break;
					}
					// иначе добавление вершины в путь муравья
					else {
						ants[i].add_vertex(good_vertex, graph_matrix[ants[i].lastVertex()][good_vertex]);
					}
				} while (good_vertex != goal);
			}
			// Запись всех путей, где муравьи дошли от начала до конца
			for (auto ant : ants) {
				tpath = ant.path;
				if (extended_routes.size() == 10) {
					break;
				}
				if (tpath.size() > 0)
				{
					if (tpath[0] == start && tpath[tpath.size() - 1] == goal) {
						//определение длины пути
						double length = 0;
						for (int i = 0; i < tpath.size() - 1; i++) {
							length += graph_matrix[tpath[i]][tpath[i + 1]];
						}
						if (extended_routes.size() != 0) {
							add_route(tpath, length);
						}
						else {
							extended_routes.push_back(std::make_pair(tpath, length));
						}
					}
				}
			}
			// Перераспределение феромона на ребрах и испарение
			for (unsigned i = 0; i < num_vertices; ++i)
				for (unsigned j = 0; j < num_vertices; ++j)
					pheromone[i][j] = (1 - p) * pheromone[i][j];
			for (auto ant : ants)
				ant.add_pheromone(pheromone, Q);
		}

		//Сортировка путей
		std::sort(extended_routes.begin(), extended_routes.end(), sortbysec);
	}
};

int main(int argc, char* argv[]) {
	Graph graph(atoi(argv[3]));
	vert start = atoi(argv[1])-1;
	vert goal = atoi(argv[2])-1;

	graph.reset_pheromone();
	unsigned ticks = 5;
	graph.ant_algorithm(start, goal, ticks);

	//Вывод путей
	if (extended_routes.size() > 0) {
		for (int i = 0; i < extended_routes.size(); i++) {
			Path route = extended_routes[i].first;
			for (int j = 0; j < route.size(); j++) {
				if (j == route.size() - 1)
					std::cout << route[j] + 1;
				else
					std::cout << route[j] + 1 << " ";
			}
			if (i == extended_routes.size() - 1)
				std::cout << "Length" << extended_routes[i].second;
			else
				std::cout << "Length" << extended_routes[i].second << std::endl;
		}
	}
	return 0;
}