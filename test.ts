// tests go here; this will not be compiled when this package is used as an extension.

OKBit_ADC.AnalogInitial();
OKBit_GPIO.GpioInit();
OKBit_PWM.PWMinit();
OKBit_OLED.init();

OKBit_PWM.SetMortorSpeed(0, 500, OKBit_PWM.MotorDirection.Forward)
OKBit_PWM.SetMortorSpeed(1, 500, OKBit_PWM.MotorDirection.Backward)


basic.forever(function() {
    adc_update();
    gpio_update();
    pwm_update();
})


let adc_timestamp_ms = 0;
function adc_update(): void{
    if(control.millis() - adc_timestamp_ms >= 1000){
        for(let i = 0; i < 8 ; i++){
            OKBit_OLED.writeNumNewLine(OKBit_ADC.AnalogReadVoltage(i));
        }
        adc_timestamp_ms = control.millis();
    }
}

let gpio_timestamp_ms = 0;
let gpio_cnt = 0;
function gpio_update(): void{
    if(control.millis() - gpio_timestamp_ms >= 100){
        OKBit_GPIO.GpioWrite(gpio_cnt, OKBit_GPIO.GpioRead(gpio_cnt) ? 0 : 1);
        gpio_cnt = (gpio_cnt+1)% 16;
        gpio_timestamp_ms = control.millis();
    }
}

let pwm_timestamp_ms = 0;
let servo_angle = 0;
let servo_dir = 0;
function pwm_update(): void{
    if(control.millis() - pwm_timestamp_ms >= 1){
        for(let i = 0; i < 8; i++){
            OKBit_PWM.SetServoAngle(i,servo_angle);
        }
        servo_angle += servo_dir ? -1:1 ;

        if(servo_angle >= 180 || servo_angle <= 0){
            servo_dir = 1-servo_dir;
        }
    }
}

