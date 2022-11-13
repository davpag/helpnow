#include <iostream>
#include <vector>
#include <string>
#include "user.c++"

using namespace std;

class Case
{
    public:
    User user;
    int id;
    int duration;
    vector<string>symptoms;
    Case(vector<string>, int, int, User);

};

Case::Case(vector<string>symps, int dur, int i, User us)
{
    user=us;
    duration=dur;
    symptoms=symps;
}