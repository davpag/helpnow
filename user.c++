#include <string>

using namespace std;

class User
{   public:
    int id,height, weight;
    string ethnicity, state;
    char sex;
    User(int, int, string, string, string, char);
    User(){}
    ~User(){}
};

User::User(int h, int w, string eth, string cit, string st, char se)
{
    height=h;weight=w;ethnicity=eth;state=st;sex=se;
}