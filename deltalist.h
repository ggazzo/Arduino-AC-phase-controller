char deltalist_current = -1;

struct deltaItem {
    char value;
    char next;
} ;

struct deltaItem deltalist [NUMBER_OUTPUT] ;

void deltalist_deleteValue(char id){
  char * a = &deltalist_current;
  while( *a > -1 ){
    if(id == *a){
      *a = deltalist[*a].next;
      if(*a > -1){
        deltalist[*a].value += deltalist[id].value;
        return;
      }
    }
    a = &deltalist[*a].next;
  }
}

void deltalist_setValue(char _id, char value){
    char * id;
    deltalist_deleteValue(_id);
    deltalist[_id].value = value;
    deltalist[_id].next = -1;
    if(deltalist_current == -1){
        deltalist_current = _id;
        return;
    }
    id = &deltalist_current;
    do {
        if(deltalist[*id].value < deltalist[_id].value ){
            deltalist[_id].value -= deltalist[*id].value;

            if(deltalist[*id].next == -1){
              deltalist[*id].next = _id;
              return;
             }
            id = &deltalist[*id].next;
        } else {
            deltalist[_id].next = *id;
            deltalist[*id].value -= deltalist[_id].value;
            *id = _id;
            id = &deltalist[_id].next;
            return;
        }
    } while(*id > -1);

}
