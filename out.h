class Out {
    char value;
    char pin;
    float temp;
    float lastTemp;
    long lastDebounceTime;
  public:
    Out(char p, char v){
        pinMode(p,OUTPUT);
        pin = p;
        value = v;
    };
    void set_value (char v){
        value = v;
    };
    void setTemp (float v){
        temp = v;
    };
    float getTemp (void){
        return temp;
    };
    void on(){
        digitalWrite(pin,1);
    };
    void off(){
        digitalWrite(pin,0);
    };
    char getValue(){
        return value;
    }
    void calc(float tmp){
      /*
        calcula a "aceleração"

        se a temperatura real estiver +-5% de diferença
          verifica se com essa aceleração em tantos segundos iria passar do alvo
            se sim
              - começa a diminuir
            se não
              - vai aumentando a potência

      */
      float _lastDebounceTime = millis();
      float aceleracao = (lastTemp - tmp) / (_lastDebounceTime - lastDebounceTime);

      if(tmp > this.temp && tmp / this.temp < .05){
          value += aceleracao * 60000 + tmp  > this.temp ? value == 100 ? 0 : 1 : value == 0 ? 0 : -1;
      }

      lastTemp = tmp;
      lastDebounceTime = millis();

    }
};
