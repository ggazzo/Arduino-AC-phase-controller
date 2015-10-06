#include "deltalist.h"
#define DETECT 2  //pin zero cross detect
void zeroCrossingInterrupt();
inline pwm_configure() {
  /* TIMER */
  //set timer1 interrupt at 6000Hz
  TCCR1A = 0;// set entire TCCR1A register to 0
  TCCR1B = 0;// same for TCCR1B
  TCNT1  = 0;//initialize counter value to 0
  // set compare match register for 1hz increments
  OCR1A = 40;// = (16*10^6) / (6000*1) - 1 (must be <65536)
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
    deltalist_setValue(i,outs[i].getValue());
    outs[i].off();
  }
}

ISR(TIMER1_COMPA_vect){ //comparator match
  if(deltalist_current < 0){
    return;
  }
  do {
    if(--deltalist[deltalist_current].value <= 0){
      outs[deltalist_current].on();
      deltalist_current = deltalist[deltalist_current].next;
    }
  } while(deltalist[deltalist_current].value == 0 && deltalist_current > -1 );
}
