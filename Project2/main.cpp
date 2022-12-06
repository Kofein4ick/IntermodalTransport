#include "Graph.h"
#include <algorithm>

/*
* Первый параметр - индекс города отправки
* Второй параметр - индекс города назначения
* Третий параметр - критерии поиска
*/
int main(int argc, char* argv[]) {
	std::vector<Node*> path;//Найденный путь
	unsigned int mode = atoi(argv[3]);//Выбор расстояния или стоимости
	Graph graph(mode);//Создание и заполнение графа
	unsigned int in_s = atoi(argv[1]);//Стартовая вершина
	unsigned int in_g = atoi(argv[2]);//Конечная вершина

	Node* start = &graph.nodes[in_s - 1];
	Node* goal = &graph.nodes[in_g - 1];
	path = graph.A_star(start, goal);

	if (path.empty()) {
		return 0;
	}
	std::reverse(path.begin(), path.end());
	double cost = 0, j = 0;
	for (Node* el : path) {
		if (j == path.size() - 1)
			std::cout << el->index + 1;
		else
			std::cout << el->index + 1 << " ";
		cost = el->cost_prev + cost;
		j++;
	}
	std::cout << "Length" << cost;
	return 0;
}