#include "condition.c++"
#include <fstream>
#include <algorithm>
#include <iomanip>

using namespace std;

bool sortbysec(const pair<int,int> &a,
              const pair<int,int> &b)
{
    return (a.second < b.second);
}

int main()
{
    ifstream fin1("patients.txt");
    ifstream fin("cases.txt");
    ofstream fout("sorted.txt");
    if(!fin) cout<<"Error"<<endl;
    else
    {
        vector<Case>cases;
        int id,dura;
        while(!fin.eof())
        {   
            User user;
            fin1>>user.id>>user.height>>user.weight>>user.sex>>user.state>>user.ethnicity;
            //getline(fin1, user.ethnicity);
            vector<string>symps(4,"null");
            fin>>id>>symps[0]>>symps[1]>>symps[2]>>symps[3]>>dura;
            cases.push_back(Case(symps,dura,id,user));
        }
        Condition con(cases);
        //cout<<con.conditions.size()<<endl;
        //sort(con.condition.begin(), con.condition.end());
        for(int i=0;i<con.condition.size();i++)
        {
            cout<<con.condition[i].second.id<<endl;
            fout<<con.condition[i].second.id<<'\t'<<con.condition[i].first<<endl;
        }
        
    }
    
    return 0;
}