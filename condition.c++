#include "case.c++"
#include <iomanip>

using namespace std;

class Condition
{
    public: vector<Condition>conditions;
    const double threshold = .9;
    public: vector<pair<double,Case>>condition;

    public: Condition(vector<Case>);
    public: Condition(){}

    double similar(const Case&,const Case&);

};


Condition::Condition(vector<Case>cases)
{   

    for(int i=0;i<cases.size();i++)
    {
        Condition cond;
        cond.condition.push_back(make_pair(1,cases[i]));
        for(int j=0;j<cases.size();i++)
        {   
            double simi = similar(cases[i],cases[j]);
            cout<<setprecision(2)<<fixed<<simi<<endl;
            if(simi>=threshold)
            {
                cond.condition.push_back(make_pair(simi,cases[j]));
                //cases[i].connections.push_back(pair<Case,float>(cases[j],simi));
            }
        }
        conditions.push_back(cond);
    }
}

double Condition::similar(const Case& case1, const Case& case2)
{
    double sim=0;
    for(int i=0;i<case1.symptoms.size();i++)
    {
        for(int j=0;j<case2.symptoms.size();j++)
        {
            if(case1.symptoms[i]==case2.symptoms[j])sim++;
        }
    }
    if(abs(case1.user.height-case2.user.height)<3)sim++;
    if(abs(case1.user.weight-case2.user.weight)<15)sim++;
    if(case1.user.ethnicity==case2.user.ethnicity)sim++;
    if(case1.user.state==case2.user.state)sim++;
    if(case1.user.sex==case2.user.sex)sim++;

    if(sim==1)return 0;
    else return sim/(9);
}