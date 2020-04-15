//quoted from:https://github.com/lioujj/pxt-DHT11

//tpins設定使用哪一個腳位
//pin，將tpins所設定的腳位傳遞給pin的變數可以，即可讓兩個function皆可使用相同腳位


//% block="test_dht11" color=#AA278D icon="\uf2c9"

namespace test_dht11 {
    let pin = DigitalPin.P0;
    let init = false;

    //% blockId=setPin 
    //% block="set DHT11 to pin %tpins"
    //% tpins.fieldEditor="gridpicker" 
    //% tpins.fieldOptions.columns=4
    //% tpins.fieldOptions.tooltips="false" 
    //% tpins.fieldOptions.width="300"
    export function setPin(tpins: DigitalPin): void {
        pin = tpins;
        init = true;
    }


    function dht11Request(): void {
        pins.digitalWritePin(pin, 0)
        basic.pause(18)
        let i = pins.digitalReadPin(pin)
        pins.setPull(pin, PinPullMode.PullUp);
    }



    //% blockId=temperature 
    //% block="temperature"    
    export function temperature(): number {
        if (init) {
            dht11Request();
            while (pins.digitalReadPin(pin) == 1);
            while (pins.digitalReadPin(pin) == 0);
            while (pins.digitalReadPin(pin) == 1);
            
            let value = 0;
            let counter = 0;

            for (let i = 0; i <= 32 - 1; i++) {
                while (pins.digitalReadPin(pin) == 0);
                counter = 0
                while (pins.digitalReadPin(pin) == 1) {
                    counter += 1;
                }
                if (i > 15) {
                    if (counter > 2) {
                        value = value + (1 << (31 - i));
                    }
                }
            }
            return ((value & 0x0000ff00) >> 8);
        }
        else
            return 0;
    }



    //% blockId=humidity 
    //% block="humidity" 
    export function humidity(): number {
        if (init) {
            dht11Request();
            while (pins.digitalReadPin(pin) == 1);
            while (pins.digitalReadPin(pin) == 0);
            while (pins.digitalReadPin(pin) == 1);

            let value = 0;
            let counter = 0;

            for (let i = 0; i <= 8 - 1; i++) {
                while (pins.digitalReadPin(pin) == 0);
                counter = 0
                while (pins.digitalReadPin(pin) == 1) {
                    counter += 1;
                }
                if (counter > 3) {
                    value = value + (1 << (7 - i));
                }
            }
            return value;
        }
        else
            return 0;
    }
}  