#include "Graph.h"
#include <algorithm>

/*
* ������ �������� - ������ ������ ��������
* ������ �������� - ������ ������ ����������
* ������ �������� - �������� ������
*/
int main(int argc, char* argv[]) {
	std::vector<Node*> path;//��������� ����
	unsigned int mode = atoi(argv[3]);//����� ���������� ��� ���������
	Graph graph(mode);//�������� � ���������� �����
	unsigned int in_s = atoi(argv[1]);//��������� �������
	unsigned int in_g = atoi(argv[2]);//�������� �������

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