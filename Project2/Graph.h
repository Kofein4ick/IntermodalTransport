#include <vector>
#include <iostream>
#include <string>
#include <fstream>
#include <deque>
#include <cstdlib>

const auto MAX = UINT_MAX;

typedef double weight_t;//Из муравьев переопределение дабла
typedef std::vector<std::vector<weight_t>> Matrix;//Из муравьев определение матрицы

class Node {//Вершина
public:
	struct neigbors_nodes {//Соседние вершины
		Node* neighbor;
		double distance;//Расстояние/вес/стоимость ребра
	};
	Node* prev;//Для сбора пути
	double cost_prev;//Для подсчета стоимости пути
	std::vector<neigbors_nodes> neighbors;//Массив соседенй
	double f;//Функциональная стоимость вершины A* f=g+h
	double g;//Стоимость вершины A*
	double h;//Эврестическая оценка (Эйлерово расстояние через неравенство треугольника) (из муравьев, доработано тут)
	unsigned int index;//Индекс вершины

	Node(unsigned int in_index);
	~Node();
	void set_neighbors(Node* neighbor, double distance);
};

class Graph {//Граф
public:
	std::vector<Node> nodes;//Массив вершин
	Matrix graph_matrix; // Матрица графа (Из муравьев)
	Matrix heuristic_matrix; // Матрица эвристик (Из муравьев)
	int find_node(unsigned int index);// Поиск вершины по индексу
	std::vector<Node*>A_star(Node* start, Node* goal);//А*
	unsigned g_num_verts;//Количество вершин
	Graph(std::string path);
	void add_edge(unsigned int from, unsigned int to, weight_t weight);
	void set_heuristic_matrix();//Заполнение матрицы эвристик (из муравьев)
	~Graph();
};