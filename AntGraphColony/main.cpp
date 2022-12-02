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

const auto MAX = UINT_MAX;
int amount_of_verticles = 0;
typedef unsigned vert;
typedef double weight_t;
typedef std::vector<std::vector<weight_t>> Matrix;
typedef std::vector<vert> Path;
typedef Path Vertex_vec;
std::vector<std::pair<Path, int>> extended_routes;

struct vertex
{
	vert index;
	unsigned heuristic;
	vertex(vert Index, unsigned Heuristic) : index(Index), heuristic(Heuristic) {}
};

//Для работы с путями и их сортирвоки
int vec_compare(Path a, const std::pair<Path, int>& b) {
	if (a.size() != b.first.size())
		return 0;

	int length = a.size();
	int comparer = 0;
	for (int i = 0; i < length; i++) {
		if (a[i] == b.first[i]) {
			comparer++;
		}
	}

	if (comparer == length) {
		return 1;
	}
	else {
		return 0;
	}
}

void add_route(Path candidate, int length) {
	int comparer = 0;
	int res = 0;
	for (int i = 0; i < extended_routes.size(); i++) {
		res = vec_compare(candidate, extended_routes[i]);
		if (res == 1) {
			comparer++;
		}
	}

	if (comparer == 0) {
		extended_routes.push_back(std::make_pair(candidate, length));
	}

}

bool sortbysec(const std::pair<Path, int>& a, const std::pair<Path, int>& b)
{
	return (a.second < b.second);
}

class Graph
{
	size_t num_vertices; // Количество вершин
	Matrix graph_matrix; // Матрица графа
	Matrix pheromone;    // Матрица феромонов
	vert goal_vert;


public:

	Graph(std::string path) {
		std::ifstream file(path);
		file >> this->num_vertices;
		amount_of_verticles = this->num_vertices;
		unsigned weight, from, to;
		graph_matrix = std::vector<std::vector<weight_t>>(this->num_vertices, std::vector<weight_t>(this->num_vertices, MAX));

		//обнуление всего графа
		for (int i = 0; i < num_vertices; i++)
			for (int j = 0; j < num_vertices; j++)
				graph_matrix[i][j] = 0;

		while (file >> from) {
			file >> to >> weight;
			this->add_edge(from, to, weight);
		}

		file.close();
		for (unsigned i = 0; i < this->num_vertices; ++i)
			this->graph_matrix[i][i] = 0;
	}

	void add_edge(vert from, vert to, weight_t weight) {
		graph_matrix[from][to] = weight;
	}

	Matrix get_reverse() const { // Обратная матрица
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
		Path path; // Маршрут муравья (Tk)
		std::vector<bool> visited; // Посещенные вершины
		weight_t len; // Длина маршрута 

		Ant(vert start, unsigned num_ver = amount_of_verticles) : path(1, start), len(0) {
			visited = std::vector<bool>(num_ver, false);
			visited[start] = true;
		}

		void delete_ant()
		{
			path.clear();
			len = 0;
		}

		bool find(vert vertex) {
			// Если дошли до конца и не нашли -> false, не дошли до конца/нашли -> true
			return visited[vertex];
		}

		vert lastVertex() { return path.back(); }

		void add_vertex(vert vertex, weight_t weight) {
			visited[vertex] = true;
			if (weight != MAX)
				len += weight;
			path.push_back(vertex);
		}


		void add_pheromone(Matrix& pheromone, double Q) {
			if (!path.empty()) {
				for (unsigned i = 0; i < path.size() - 1; ++i)
					pheromone[path[i]][path[i + 1]] += Q / len;
			}
		}
	};


	// Выбор вершины с заданными вероятностями
	vert choose_vertex(Ant& ant, Matrix& reverse_matrix, const double alpha, const double betta) {
		auto current = ant.lastVertex();
		auto un_vertices = unvisited_neighbours(current, ant);
		auto chance = probability(pheromone, reverse_matrix, current, un_vertices, alpha, betta);
		const auto random_number = (std::rand()) / static_cast<double>(RAND_MAX);
		// Смотрим интервалы от 0.0 до 1.00
		vert good_vertex_rand = MAX;
		double sum_chance = 0.0;
		for (unsigned i = 0; i < chance.size(); ++i) {
			if (sum_chance <= random_number)
				good_vertex_rand = un_vertices[i];
			sum_chance += chance[i];
		}
		return good_vertex_rand;
	}

	// Непосещенные соседи
	Vertex_vec unvisited_neighbours(vert& current, Ant& ant) {
		std::vector<vert> neigh_vec;
		// Проходим по всем вершинам
		for (unsigned i = 0; i < num_vertices; ++i) {
			if (graph_matrix[current][i] < MAX && graph_matrix[current][i] > 0 && current != i && !ant.find(i))
				neigh_vec.push_back(i);
		}
		return neigh_vec;
	}

	// Вероятность перехода муравья из вершины i в вершину j
	std::vector<double> probability(Matrix& pheromone, Matrix& reverse, vert current,
		Vertex_vec& un_vertices, double alpha, double betta) {
		// Шансы попадания в каждую смежную вершину
		std::vector<double> chance = std::vector<double>(un_vertices.size());;
		// Считаем вероятность попадания в каждую вершину
		auto sum = 0.0;
		for (auto un_vert : un_vertices) // Считаем знаменталь сложной формулы
			sum += pow(pheromone[current][un_vert], alpha) * pow(reverse[current][un_vert], betta);
		for (unsigned i = 0; i < un_vertices.size(); ++i)
			chance[i] = pow(pheromone[current][un_vertices[i]], alpha) * pow(reverse[current][un_vertices[i]], betta) / sum;
		// Возвращаем вероятности
		return chance;
	}

	void reset_pheromone() { // Задаём матрицу феремонов
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
		// Для будущего рандома
		srand(time(nullptr));
		// Коэффициенты коллективного и индивидуального интеллекта
		const double alpha = 0.9;
		const double betta = 0.1;
		// Количество феромона
		const double Q = 10;
		// Количество муравьев в колонии
		const unsigned M = 100;
		// Коэффициент испарения
		const double p = 0.1;


		// Задаем матрицу, обратную матрице весов
		static auto reverse_matrix = this->get_reverse();

		// Цикл по всем итерациям
		for (unsigned k = 0; k < ticks; ++k) {
			// Создаем нужное кол-во муравьев
			std::vector<Ant> ants(M, Ant(start));

			// Цикл по всем муравьям
			for (unsigned i = 0; i < M; ++i) {
				vert good_vertex;
				// Цикл прохода муравья по графу
				do {
					// Выбираем вершину
					good_vertex = choose_vertex(ants[i], reverse_matrix, alpha, betta);
					// Если муравей оказался в тупике - пропускаем его
					if (good_vertex == MAX) {
						ants[i].delete_ant();
						break;
					}
					else {
						ants[i].add_vertex(good_vertex, graph_matrix[ants[i].lastVertex()][good_vertex]);
					}
				} while (good_vertex != goal);
			}
			// Записываем все пути, где муравьи дошли от начала до конца
			for (auto ant : ants) {
				tpath = ant.path;
				if (tpath.size() > 0)
				{
					if (tpath[0] == start && tpath[tpath.size() - 1] == goal) {
						//определение длины пути
						int length = 0;
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
			// Оставляем феромон на ребрах + испарение
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
	setlocale(LC_ALL, "Russian");
	enum Algorithm { A_STAR, ANT };
	bool k;
	unsigned short selected_algorithm = 1;
	Graph graph(argv[1]);
	vert start = atoi(argv[2]), goal = atoi(argv[3]);

	graph.reset_pheromone();
	unsigned ticks = 5;
	graph.ant_algorithm(start, goal, ticks);

	//Вывод пути
	if (extended_routes.size() > 0) {
		for (int i = 0; i < extended_routes.size(); i++) {
			Path route = extended_routes[i].first;
			for (int j = 0; j < route.size(); j++) {
				if (j == route.size() - 1)
					std::cout << route[j];
				else
					std::cout << route[j] << " ";
			}
			if ( i == extended_routes.size() - 1)
				std::cout << "Length" << extended_routes[i].second;
			else
				std::cout << "Length" << extended_routes[i].second << std::endl;
		}
	}
	return 0;
}