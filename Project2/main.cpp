#include "Graph.h"
#include <algorithm>

int main() {
	setlocale(LC_ALL, "Russian");
	std::vector<Node*> path;//��������� ����
	Graph graph("graph.txt");//�������� � ���������� �����
	unsigned int in_s=0;//��������� �������
	unsigned int in_g=0;//�������� �������
	for (Node el : graph.nodes) {//���� ������ ������ ���������(�������� ������������ ������������)
		std::cout << el.index << ": ";
		for (auto el2 : el.neighbors) {
			std::cout << el2.neighbor->index << " ";
		}
		std::cout << std::endl;

	}
	std::cout << "�����:"; std::cin >> in_s;
	std::cout << "�����:"; std::cin >> in_g;
	Node* start= &graph.nodes[in_s];
	Node* goal = &graph.nodes[in_g];
	path = graph.A_star(start,goal);
	if (path.empty()) {
		std::cout << "���� �� ������\n";
		system("pause");
		return 0;
	}
	std::reverse(path.begin(), path.end());
	int cost=0;
	std::cout << "���������� ����:";
	for (Node* el : path) {
		std::cout << el->index << " ";
		cost = el->cost_prev + cost;
	}
	std::cout << "\n���������: " << cost << std::endl;
	system("pause");
	return 0;
}