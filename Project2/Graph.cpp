#include "Graph.h"
//��������� ������
void Node::set_neighbors(Node* neighbor, double distance) {
	neigbors_nodes new_node;
	new_node.neighbor = neighbor;
	new_node.distance = distance;
	this->neighbors.push_back(new_node);
};
//����������� node
Node::Node(unsigned int in_index) { 
	this->f = 0;
	this->g = 0;
	this->h = 0;
	this->prev = nullptr;
	this->index = in_index;
};

Node::~Node() {};
//����� ������� �� �������
int Graph::find_node(unsigned int index) {
	for (Node el : this->nodes) {
		if (el.index == index) {
			return el.index;
		}
	}
	return -1;
};
//����������� graph
Graph::Graph(std::string path) {
	std::ifstream file(path);
	unsigned num_verts;
	unsigned weight, from, to;
	unsigned int temp = -1;
	file >> num_verts;
	this->g_num_verts = num_verts;
	while (file >> from) {
		Node in = Node(from);
		this->nodes.push_back(in);
		if (nodes.size() == num_verts) break;
	}
    this->graph_matrix = std::vector<std::vector<weight_t>>(this->g_num_verts, std::vector<weight_t>(this->g_num_verts, MAX));
    //��������� ����� �����
    for (int i = 0; i < g_num_verts; i++)
        for (int j = 0; j < g_num_verts; j++)
            this->graph_matrix[i][j] = 0;
	int i = 0;
	while (file >> from) {
		file >> to >> weight;//���������� ������ � ������
        this->add_edge(from, to, weight);//�������� � �������
        //�������� � ������
		if (this->nodes[i].index == from) {//���� ������� ��� ���������������
			int neig = this->find_node(to);//�������� ������ ������ � �������
			this->nodes[i].set_neighbors(&this->nodes[neig], weight);//��������� ������

		}
		else {
            //�������� ������
            if (this->nodes[i].index < from)
                while(this->nodes[i].index != from)
			        i++;
            else
                while (this->nodes[i].index != from)
                    i--;
			int neig = this->find_node(to);//�������� ������ ������� ������
			this->nodes[i].set_neighbors(&this->nodes[neig], weight);//���������
		}
	}
    for (unsigned i = 0; i < this->g_num_verts; ++i)
        this->graph_matrix[i][i] = 0;

    set_heuristic_matrix();//���������� ������� ��������
	file.close();
};
Graph::~Graph() {};

void Graph::add_edge(unsigned int from, unsigned int to, weight_t weight) { // ���������� �����
	graph_matrix[from][to] = weight;
};

void Graph::set_heuristic_matrix() { // ������� ���� ��������, ����� ������� ���� ����� �� ����������� ������������
	heuristic_matrix = graph_matrix;
	for (size_t k = 0; k < g_num_verts; k++)
		for (size_t i = 0; i < g_num_verts; i++)
			for (size_t j = 0; j < g_num_verts; j++)
                if (heuristic_matrix[i][k] != MAX && heuristic_matrix[k][j] != MAX) {
                    if (heuristic_matrix[i][j] != 0)
                        heuristic_matrix[i][j] = std::min(heuristic_matrix[i][j], std::abs(heuristic_matrix[k][j] - heuristic_matrix[i][k]));
                    else
                        heuristic_matrix[i][j] = std::abs(heuristic_matrix[k][j] - heuristic_matrix[i][k]);
                }

};


//������� ����������
short Search(std::deque<Node*>& Array2, unsigned int low, unsigned int high);
short Qsort(std::deque<Node*>& Array2, unsigned int low, unsigned int high);
//����� � ����
bool search_in_deque(std::deque<Node*> where, unsigned int index);
//�������������� ����
std::vector<Node*> reconstruct_path(Node* start, Node* goal);

std::vector<Node*> Graph::A_star(Node* start, Node* goal) {
    std::deque<Node*> closedset;//������ ������������� ������
    std::deque<Node*> openset;//������ ��������������� ������
    openset.push_back(start);

    start->g = 0;
    start->h = this->heuristic_matrix[start->index][goal->index];
    start->f = start->g + start->h;

    while (!openset.empty()) {
        Qsort(openset, 0, openset.size() - 1);//���������� �� f
        Node* x = openset.front();
        if (x->index == goal->index)
            return reconstruct_path(start, goal);
        openset.pop_front();
        closedset.push_back(x);
        int i = 0;
        for (i = 0; i < x->neighbors.size(); i++) {//������������� ������� ������� �������
            if (search_in_deque(closedset, x->neighbors[i].neighbor->index))//���������� ���� ��� �����������
                continue;
            bool tentative_is_better;
            double tentative_g_score = x->g + x->neighbors[i].distance;//������� ���������
            if (!search_in_deque(openset, x->neighbors[i].neighbor->index)) { // ���� ����� x ��� �� � ������ ��������������� - ������� ��� ����
                openset.push_back(x->neighbors[i].neighbor);
                tentative_is_better = true;
            }//if
            else { // �����(�) ��� � �������� ������, � ������ ��� �������� ��� g(y), h(y) � f(y)
                if (tentative_g_score < x->neighbors[i].neighbor->g) {
                    // ����������� g(y) ����� x ��������� ������, � ������ ����� ����� ��������  g(y), h(y), f(y)
                    tentative_is_better = true;
                }//if
                else {
                    // ����������� g(y) ����� x ��������� ������, ��� ��������� � openset. 
                    // ��� ��������, ��� �� ������� x ���� ����� ����� ������ ������
                    // �.�. ���������� ����� ������� �������, ����������� ����� ����� ������ (�� �����-�� ������ �������, �� �� x)
                    // ������� ������� ������ �� ����������
                    tentative_is_better = false;
                }//else
            }//else
             // ���������� ������� ������. 
            if (tentative_is_better == true) {
                x->neighbors[i].neighbor->prev = x;//������� � ������� �� ������. ������������ ��� ������������� ����.
                x->neighbors[i].neighbor->cost_prev = x->neighbors[i].distance;
                x->neighbors[i].neighbor->g = tentative_g_score;
                x->neighbors[i].neighbor->h = this->heuristic_matrix[x->neighbors[i].neighbor->index][goal->index];;
                x->neighbors[i].neighbor->f = x->neighbors[i].neighbor->g + x->neighbors[i].neighbor->h;
            }
 
        }//for

    }//whille
    std::vector<Node*> er;
    return er;
};//A_star
//�������������� ����
std::vector<Node*> reconstruct_path(Node* start, Node* goal) {
    std::vector<Node*> path;
    Node* current_node = goal;
    while (current_node != nullptr) {
        path.push_back(current_node);
        current_node = current_node->prev;
    }
    return path;
}

//������� ����������
short Qsort(std::deque<Node*>& Array2, unsigned int low, unsigned int high)
{
    unsigned int p;
    if (low < high)
    {
        p = Search(Array2, low, high);//���������� � ����� �������� ��������
        Qsort(Array2, low, p);//���������� ����� ��������
        Qsort(Array2, p + 1, high);//���������� ������ ��������
    }
    return 0;
}
short Search(std::deque<Node*>& Array2, unsigned int low, unsigned int high)
{
    unsigned int p = Array2[(high + low) / 2]->f;//������� �������
    unsigned int i = low - 1;//������ �������
    unsigned int j = high + 1;//������� �������
    Node* temp;
    for (unsigned int q = 0;; q++)
    {
        do
            i++;
        while (Array2[i]->f < p);//���� ������� ������ ������ ������ ��������
        do
            j--;
        while (Array2[j]->f > p);//���� ������� ����� ������ ������ ��������
        if (i >= j)//���� �������� �������
            return j;
        if (Array2[i]->f == Array2[j]->f)//������� ������ �����
            continue;
        //������������
        temp = Array2[i];
        Array2[i] = Array2[j];
        Array2[j] = temp;
    }
}
//����� � ����
bool search_in_deque(std::deque<Node*> where, unsigned int index) {
    bool res = false;
    for (Node* el : where) {
        if (el->index == index) {
            res = true;
            break;
        }
    }
    return res;
}