#include "Graph.h"
#include <pqxx/pqxx>


//Установка соседа
void Node::set_neighbors(Node* neighbor, double distance) {
	neigbors_nodes new_node;
	new_node.neighbor = neighbor;
	new_node.distance = distance;
	this->neighbors.push_back(new_node);
};
//Конструктор node
Node::Node(unsigned int in_index) { 
	this->f = 0;
	this->g = 0;
	this->h = 0;
	this->prev = nullptr;
	this->index = in_index;
};

Node::~Node() {};
//Поиск вершины по индексу
int Graph::find_node(unsigned int index) {
	for (Node el : this->nodes) {
		if (el.index == index) {
			return el.index;
		}
	}
	return -1;
};
//Конструктор graph
Graph::Graph(std::string path,unsigned int mode) {
	//std::ifstream file(path);
	unsigned num_verts;
	unsigned weight, from, to;
	//file >> num_verts;
    /****************************************************************************************************/
    std::string connectionString = "host=localhost port=5432 dbname=bd user=postgres password =admin";
    try
    {
        pqxx::connection connectionObject(connectionString.c_str());
        pqxx::work worker(connectionObject);
        pqxx::result response = worker.exec("SELECT * FROM cities ORDER BY id");
        num_verts = response.size();
        this->g_num_verts = num_verts;
        for (size_t i = 0; i < response.size(); i++)
        {
            from = atoi(response[i][0].c_str())-1;
            Node in = Node(from);
            this->nodes.push_back(in);
        }


        this->graph_matrix = std::vector<std::vector<weight_t>>(this->g_num_verts, std::vector<weight_t>(this->g_num_verts, MAX));
        //обнуление всего графа
        for (int i = 0; i < g_num_verts; i++)
            for (int j = 0; j < g_num_verts; j++)
                this->graph_matrix[i][j] = 0;

        response = worker.exec("SELECT * FROM routes ORDER BY id");
        int i = 0;
        for (size_t k = 0; k < response.size(); k++)
        {
            from = atoi(response[k][1].c_str())-1;
            to=atoi(response[k][2].c_str())-1;
            weight = (mode == 0) ? atoi(response[k][3].c_str()) : atoi(response[k][4].c_str());
            this->add_edge(from, to, weight);//Внесение в матрицу
            if (this->nodes[i].index == from) {//Если вершина уже рассматривается
                int neig = this->find_node(to);//Получаем индекс соседа в массиве
                this->nodes[i].set_neighbors(&this->nodes[neig], weight);//Добавляем соседа

            }
            else {
                //Подводим индекс
                if (this->nodes[i].index < from)
                    while (this->nodes[i].index != from)
                        i++;
                else
                    while (this->nodes[i].index != from)
                        i--;
                int neig = this->find_node(to);//Получаем индекс вершины соседа
                this->nodes[i].set_neighbors(&this->nodes[neig], weight);//Добавляем
            }

        }

        connectionObject.close();
    }
    catch (const std::exception& e)
    {
        std::cerr << e.what() << std::endl;
    }
    /*******************************************************************************************************/

    /*while (file >> from) {
		Node in = Node(from);
		this->nodes.push_back(in);
		if (nodes.size() == num_verts) break;
	}*/
    
/*	int i = 0;
	while (file >> from) {
		file >> to >> weight;//Заполнение списка и матриц
        this->add_edge(from, to, weight);//Внесение в матрицу
        //Внесение в список
		if (this->nodes[i].index == from) {//Если вершина уже рассматривается
			int neig = this->find_node(to);//Получаем индекс соседа в массиве
			this->nodes[i].set_neighbors(&this->nodes[neig], weight);//Добавляем соседа

		}
		else {
            //Подводим индекс
            if (this->nodes[i].index < from)
                while(this->nodes[i].index != from)
			        i++;
            else
                while (this->nodes[i].index != from)
                    i--;
			int neig = this->find_node(to);//Получаем индекс вершины соседа
			this->nodes[i].set_neighbors(&this->nodes[neig], weight);//Добавляем
		}
	}*/
    for (unsigned i = 0; i < this->g_num_verts; ++i)
        this->graph_matrix[i][i] = 0;

    set_heuristic_matrix();//Заполнение матрицы эвристик
	//file.close();
};
Graph::~Graph() {};

void Graph::add_edge(unsigned int from, unsigned int to, weight_t weight) { // Добавление ребра
	graph_matrix[from][to] = weight;
};

void Graph::set_heuristic_matrix() { // Подсчет всех эвристик, через перебор всех путей по неравенству треугольника
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


//Быстрай сортировка
short Search(std::deque<Node*>& Array2, unsigned int low, unsigned int high);
short Qsort(std::deque<Node*>& Array2, unsigned int low, unsigned int high);
//Поиск в деке
bool search_in_deque(std::deque<Node*> where, unsigned int index);
//Восстановление пути
std::vector<Node*> reconstruct_path(Node* start, Node* goal);

std::vector<Node*> Graph::A_star(Node* start, Node* goal) {
    std::deque<Node*> closedset;//Список просмотренных вершин
    std::deque<Node*> openset;//Список рассматриваемых вершин
    openset.push_back(start);

    start->g = 0;
    start->h = this->heuristic_matrix[start->index][goal->index];
    start->f = start->g + start->h;

    while (!openset.empty()) {
        Qsort(openset, 0, openset.size() - 1);//Сортировка по f
        Node* x = openset.front();
        if (x->index == goal->index)
            return reconstruct_path(start, goal);
        openset.pop_front();
        closedset.push_back(x);
        int i = 0;
        for (i = 0; i < x->neighbors.size(); i++) {//Просматриваем соседей текущей вершины
            if (search_in_deque(closedset, x->neighbors[i].neighbor->index))//Пропускаем если уже просмотрены
                continue;
            bool tentative_is_better;
            double tentative_g_score = x->g + x->neighbors[i].distance;//Считаем стоимость
            if (!search_in_deque(openset, x->neighbors[i].neighbor->index)) { // Если сосед x ещё не в списке рассматриваемых - добавим его туда
                openset.push_back(x->neighbors[i].neighbor);
                tentative_is_better = true;
            }//if
            else { // Сосед(у) был в открытом списке, а значит уже известны его g(y), h(y) и f(y)
                if (tentative_g_score < x->neighbors[i].neighbor->g) {
                    // Вычисленная g(y) через x оказалась меньше, а значит нужно будет обновить  g(y), h(y), f(y)
                    tentative_is_better = true;
                }//if
                else {
                    // Вычисленная g(y) через x оказалась больше, чем имеющаяся в openset. 
                    // Это означает, что из вершины x путь через этого соседа дороже
                    // т.е. существует менее дорогой маршрут, пролегающий через этого соседа (из какой-то другой вершины, не из x)
                    // Поэтому данного соседа мы игнорируем
                    tentative_is_better = false;
                }//else
            }//else
             // Обновление свойств соседа. 
            if (tentative_is_better == true) {
                x->neighbors[i].neighbor->prev = x;//Вершина с которой мы пришли. Используется для реконструкции пути.
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
//Восстановление пути
std::vector<Node*> reconstruct_path(Node* start, Node* goal) {
    std::vector<Node*> path;
    Node* current_node = goal;
    while (current_node != nullptr) {
        path.push_back(current_node);
        current_node = current_node->prev;
    }
    return path;
}

//Быстрая сортировка
short Qsort(std::deque<Node*>& Array2, unsigned int low, unsigned int high)
{
    unsigned int p;
    if (low < high)
    {
        p = Search(Array2, low, high);//Сортировка и поиск опорного элемента
        Qsort(Array2, low, p);//Сортировка левой половины
        Qsort(Array2, p + 1, high);//Сортировка правой половины
    }
    return 0;
}
short Search(std::deque<Node*>& Array2, unsigned int low, unsigned int high)
{
    unsigned int p = Array2[(high + low) / 2]->f;//Опорный элемент
    unsigned int i = low - 1;//Нижняя граница
    unsigned int j = high + 1;//Верхняя граница
    Node* temp;
    for (unsigned int q = 0;; q++)
    {
        do
            i++;
        while (Array2[i]->f < p);//ищем элемент справа больше равный опорному
        do
            j--;
        while (Array2[j]->f > p);//ищем элемент слева меньше равный опорному
        if (i >= j)//если счетчики совпали
            return j;
        if (Array2[i]->f == Array2[j]->f)//пропуск равных чисел
            continue;
        //Перестановка
        temp = Array2[i];
        Array2[i] = Array2[j];
        Array2[j] = temp;
    }
}
//Поиск в деке
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