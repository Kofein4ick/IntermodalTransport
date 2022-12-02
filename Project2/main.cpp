#include "Graph.h"
#include <algorithm>

int main() {
	system("chcp 65001");
	std::vector<Node*> path;//Найденный путь
	unsigned int mode = 0;//Выблор расстояния или стоимости
	std::cout << "Расстояние/Стоимость:"; std::cin >> mode;
	Graph graph(mode);//Создание и заполнение графа
	unsigned int in_s=0;//Стартовая вершина
	unsigned int in_g=0;//Конечная вершина
	for (Node el : graph.nodes) {//Цикл вывода списка смежности(проверка корректности заполнености)
		std::cout << el.index+1 << ": ";
		for (auto el2 : el.neighbors) {
			std::cout << el2.neighbor->index+1 << " ";
		}
		std::cout << std::endl;

	}
	std::cout << "\nСтарт:"; std::cin >> in_s;
	std::cout << "Финиш:"; std::cin >> in_g;
	Node* start= &graph.nodes[in_s-1];
	Node* goal = &graph.nodes[in_g-1];
	path = graph.A_star(start,goal);
	if (path.empty()) {
		std::cout << "Путь не найден\n";
		system("pause");
		return 0;
	}
	std::reverse(path.begin(), path.end());
	int cost=0;
	std::cout << "Кратчайший путь:";
	for (Node* el : path) {
		std::cout << el->index+1 << " ";
		cost = el->cost_prev + cost;
	}
	std::cout << "\nСтоимость: " << cost << std::endl;
	system("pause");
	return 0;
}