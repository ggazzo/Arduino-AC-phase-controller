#define DETECT 2  //zero cross detect
#define NUMBER_OUTPUT 3

void zeroCrossingInterrupt();
class Out {
    char value;
    char pin;
  public:
    Out(char p, char v){
      pin = p;
      value = v;
    };
    void set_value (char v){
      value = v;
    };
    void on(){
      Serial.print(pin,DEC);
      Serial.println("on");
      };
    void off(){
      Serial.print(pin,DEC);
      Serial.println("off");};
    char getValue(){
      return value;
    }
};
struct deltaItem {
    char value;
    char next;
} ;

struct deltaItem deltalist [NUMBER_OUTPUT] ;
char current = -1;
void deleteValue(char id){
  char * a = &current;
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
void setValue(char _id, char value){
    char * id;
    deleteValue(_id);
    deltalist[_id].value = value;
    deltalist[_id].next = -1;
    if(current == -1){
        current = _id;
        return;
    }
    id = &current;
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
Out outs [NUMBER_OUTPUT]  = {Out(0,5),Out(1,15),Out(2,17)};
void setup(){
  Serial.begin(250000);
  /* TIMER */
  //set timer1 interrupt at 6000Hz
  TCCR1A = 0;// set entire TCCR1A register to 0
  TCCR1B = 0;// same for TCCR1B
  TCNT1  = 0;//initialize counter value to 0
  // set compare match register for 1hz increments
  OCR1A = 40000;// = (16*10^6) / (6000*1) - 1 (must be <65536)
  // turn on CTC mode
  TCCR1B |= (1 << WGM12);
  // Set CS10 and CS12 bits for 1024 prescaler
  TCCR1B |= (1 << CS11 |1 << CS10);
  // enable timer compare interrupt
  TIMSK1 |= (1 << OCIE1A);

  /* interrupt PIN */
  // set up pin
  pinMode(DETECT, INPUT);     //zero cross detect
  //digitalWrite(DETECT, HIGH); //enable pull-up resistor
  // set up Timer1
  //(see ATMEGA 328 data sheet pg 134 for more details)

  // set up zero crossing interrupt
  attachInterrupt(0,zeroCrossingInterrupt, FALLING );
}

void zeroCrossingInterrupt(){ //zero cross detect
  
  TCNT1 = 0;   //reset timer - count from zero
  for(char i = 0; i < NUMBER_OUTPUT; i++){
    setValue(i,outs[i].getValue());
    outs[i].off();
  }
}

ISR(TIMER1_COMPA_vect){ //comparator match

  if(current < 0){
    return;
  }
  do{
    if(--deltalist[current].value <= 0){
      outs[current].on();
      current = deltalist[current].next;
    }
  } while(deltalist[current].value == 0 && current > -1 );
}

void loop(){
}
