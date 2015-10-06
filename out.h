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
