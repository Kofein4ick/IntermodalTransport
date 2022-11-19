#include <vector>
#include <iostream>
#include <string>
#include <fstream>
#include <deque>
#include <cstdlib>

const auto MAX = UINT_MAX;

typedef double weight_t;//�� �������� ��������������� �����
typedef std::vector<std::vector<weight_t>> Matrix;//�� �������� ����������� �������

class Node {//�������
public:
	struct neigbors_nodes {//�������� �������
		Node* neighbor;
		double distance;//����������/���/��������� �����
	};
	Node* prev;//��� ����� ����
	double cost_prev;//��� �������� ��������� ����
	std::vector<neigbors_nodes> neighbors;//������ ��������
	double f;//�������������� ��������� ������� A* f=g+h
	double g;//��������� ������� A*
	double h;//������������� ������ (�������� ���������� ����� ����������� ������������) (�� ��������, ���������� ���)
	unsigned int index;//������ �������

	Node(unsigned int in_index);
	~Node();
	void set_neighbors(Node* neighbor, double distance);
};

class Graph {//����
public:
	std::vector<Node> nodes;//������ ������
	Matrix graph_matrix; // ������� ����� (�� ��������)
	Matrix heuristic_matrix; // ������� �������� (�� ��������)
	int find_node(unsigned int index);// ����� ������� �� �������
	std::vector<Node*>A_star(Node* start, Node* goal);//�*
	unsigned g_num_verts;//���������� ������
	Graph(std::string path);
	void add_edge(unsigned int from, unsigned int to, weight_t weight);
	void set_heuristic_matrix();//���������� ������� �������� (�� ��������)
	~Graph();
};