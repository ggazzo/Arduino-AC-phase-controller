#include <OneWire.h>
#include <DallasTemperature.h>
// Data wire is plugged into port 2 on the Arduino
#define DETECT 2  //pin zero cross detect
#define NUMBER_OUTPUT 3
#define NUMBER_TEMP 3
#define ONE_WIRE_BUS 1
#define TEMPERATURE_PRECISION 9

#include "out.h"
Out outs [NUMBER_OUTPUT]  = {Out(0,5),Out(1,15),Out(2,17)};
#include "pwm.h"



// Setup a oneWire instance to communicate with any OneWire devices (not just Maxim/Dallas temperature ICs)
OneWire oneWire(ONE_WIRE_BUS);
// Pass our oneWire reference to Dallas Temperature.
DallasTemperature sensors(&oneWire);
// arrays to hold device addresses
DeviceAddress addr [NUMBER_TEMP];

void setup(){

    sensors.begin();
    for(char i = 0; i < NUMBER_TEMP ; i++){
      sensors.getAddress(addr[i], i);
    }
    pwm_configure();
}

long lastDebounceTime = 0;

void evaluate(void){
  for(char i = 0; i < NUMBER_TEMP ; i++){
    outs[id].calc(sensors.getTempC(addr[id]));
  }
}

void loop(){
  if ((millis() - lastDebounceTime) > 1000) {
    sensors.requestTemperatures();
    evaluate();
    lastDebounceTime = millis();
  }
}
