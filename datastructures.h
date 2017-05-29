#ifndef __DATASTRUCTURES_H__
#define __DATASTRUCTURES_H__

#include "lispinclude.h"

typedef std::unordered_map<std::string, struct s_expression*> environment;

typedef struct s_expression * (* cfunc)(slist * args);

/**
   the data types an expression can take on.
 */
typedef union u_expdata {
  int num;
  environment * env;
  std::string * str;
  slist * list;
  cfunc c_func;
} expdata;

/**
   a general expression
 */
typedef struct s_expression {
  int type;
  expdata data;
} expression;

#endif