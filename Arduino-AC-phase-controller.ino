#define NUMBER_OUTPUT 3
Out outs [NUMBER_OUTPUT]  = {Out(0,5),Out(1,15),Out(2,17)};
#include "pwm.h"

void setup(){
  Serial.begin(250000);
  pwm_configure();
}
void loop(){
}
