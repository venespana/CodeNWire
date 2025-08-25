# CodeNWire Component Catalog

Complete catalog of electronic components supported in the CodeNWire ESP32 circuit designer, based on Wokwi simulator and industry standards.

## 🎯 Implementation Priority

- **Phase 1**: Basic components (LED, Resistor, Button, Sensor)
- **Phase 2**: Advanced components (Displays, Motors, Communication)
- **Phase 3**: Specialized components (Power, Audio, Custom)

---

## 📱 Microcontrollers & Development Boards

### ESP32 DevKit V1 ✅ *Implemented*
**Description**: Main microcontroller board with WiFi and Bluetooth capabilities. Features 30 GPIO pins, built-in LED, and USB programming interface.
- **Pins**: 30 GPIO pins (digital/analog/PWM)
- **Features**: WiFi, Bluetooth, USB-C connector
- **Voltage**: 3.3V logic, 5V power input
- **Use Cases**: IoT projects, sensor networks, wireless communication

### Arduino Uno R3
**Description**: Classic 8-bit microcontroller board based on ATmega328P. Industry standard for learning and prototyping.
- **Pins**: 14 digital pins, 6 analog inputs
- **Features**: USB programming, barrel jack power
- **Voltage**: 5V logic and power
- **Use Cases**: Basic automation, sensor reading, motor control

### Arduino Nano
**Description**: Compact version of Arduino Uno with same functionality in smaller form factor.
- **Pins**: 14 digital pins, 8 analog inputs
- **Features**: Mini-USB programming, breadboard-friendly
- **Voltage**: 5V logic, 7-12V input
- **Use Cases**: Space-constrained projects, wearables

---

## 💡 Light Emitting Components

### LED (Light Emitting Diode)
**Description**: Semiconductor device that emits light when current flows through it. Available in multiple colors and sizes.
- **Colors**: Red, Green, Blue, Yellow, White, RGB
- **Voltage**: 1.8V-3.3V forward voltage
- **Current**: 20mA typical, 30mA maximum
- **Use Cases**: Status indicators, lighting, displays
- **Properties**: Color, brightness, blinking patterns

### LED Strip (WS2812B/NeoPixel)
**Description**: Addressable RGB LED strip where each LED can be controlled individually via single data line.
- **Features**: Individual RGB control, chainable
- **Voltage**: 5V power, 3.3V/5V data
- **Protocol**: WS2812B timing protocol
- **Use Cases**: Ambient lighting, displays, decorative effects

### 7-Segment Display
**Description**: Numeric display showing digits 0-9 using seven LED segments arranged in figure-8 pattern.
- **Types**: Common cathode, common anode
- **Digits**: 1-4 digit variants
- **Features**: Decimal point, multiplexing support
- **Use Cases**: Counters, clocks, numeric readouts

### Dot Matrix Display (8x8)
**Description**: Grid of LEDs arranged in 8x8 matrix for displaying patterns, text, or simple graphics.
- **Resolution**: 8x8 pixels (64 LEDs)
- **Control**: Row/column scanning or MAX7219 driver
- **Features**: Scrolling text, animations
- **Use Cases**: Message displays, simple graphics, games

---

## 🔘 Input Components

### Push Button
**Description**: Momentary switch that closes circuit when pressed and opens when released.
- **Types**: Normally open (NO), normally closed (NC)
- **Debouncing**: Required for clean digital signals
- **Voltage**: 3.3V/5V compatible
- **Use Cases**: User input, mode switching, interrupts

### Toggle Switch
**Description**: Maintained switch that stays in position until manually changed.
- **Positions**: 2-position (ON/OFF), 3-position (ON/OFF/ON)
- **Current**: Up to 3A switching capacity
- **Use Cases**: Power control, mode selection

### Rotary Encoder
**Description**: Input device that converts rotational position to digital signals, with optional push button.
- **Resolution**: 20-24 pulses per revolution
- **Features**: Quadrature output, push button
- **Use Cases**: Menu navigation, volume control, parameter adjustment

### Keypad (4x4)
**Description**: Matrix of 16 buttons arranged in 4x4 grid for numeric and function input.
- **Layout**: 0-9 digits plus A,B,C,D,*,# keys
- **Interface**: Matrix scanning (4 rows, 4 columns)
- **Use Cases**: PIN entry, calculators, control panels

---

## 🌡️ Sensors

### DHT22 (Temperature & Humidity)
**Description**: Digital sensor measuring temperature (-40°C to 80°C) and humidity (0-100% RH) with high accuracy.
- **Accuracy**: ±0.5°C temperature, ±2-5% humidity
- **Interface**: Single-wire digital protocol
- **Power**: 3.3V-5V operation
- **Use Cases**: Weather stations, HVAC control, environmental monitoring

### DS18B20 (Temperature)
**Description**: Digital temperature sensor with 1-Wire interface, waterproof versions available.
- **Range**: -55°C to +125°C
- **Accuracy**: ±0.5°C from -10°C to +85°C
- **Features**: Unique 64-bit address, multiple sensors on one wire
- **Use Cases**: Temperature logging, aquarium monitoring, industrial sensing

### HC-SR04 (Ultrasonic Distance)
**Description**: Ultrasonic sensor measuring distance using sound waves, range 2cm to 400cm.
- **Interface**: Trigger/Echo pins
- **Accuracy**: ±3mm
- **Beam Angle**: 15 degrees
- **Use Cases**: Obstacle detection, liquid level sensing, robotics

### PIR Motion Sensor
**Description**: Passive infrared sensor detecting motion by measuring changes in infrared radiation.
- **Detection Range**: 3-7 meters
- **Angle**: 110-120 degrees
- **Features**: Adjustable sensitivity and delay
- **Use Cases**: Security systems, automatic lighting, presence detection

### Light Sensor (LDR/Photoresistor)
**Description**: Variable resistor that changes resistance based on light intensity.
- **Resistance**: 1kΩ (bright) to 10MΩ (dark)
- **Interface**: Analog input with voltage divider
- **Response**: Slow response time (seconds)
- **Use Cases**: Automatic lighting, day/night detection

### Accelerometer/Gyroscope (MPU6050)
**Description**: 6-axis motion sensor combining 3-axis accelerometer and 3-axis gyroscope.
- **Interface**: I2C communication
- **Range**: ±2g to ±16g (accelerometer), ±250°/s to ±2000°/s (gyroscope)
- **Features**: Built-in temperature sensor, interrupt pins
- **Use Cases**: Motion detection, orientation sensing, robotics

---

## 🔊 Audio Components

### Buzzer (Active)
**Description**: Electronic buzzer that generates tone when voltage is applied, built-in oscillator.
- **Frequency**: Fixed frequency (typically 2-4kHz)
- **Volume**: 85dB at 10cm
- **Interface**: Simple on/off control
- **Use Cases**: Alarms, notifications, simple sounds

### Buzzer (Passive)
**Description**: Electromagnetic buzzer requiring external square wave signal to generate tones.
- **Frequency Range**: 100Hz to 20kHz
- **Interface**: PWM signal for tone generation
- **Features**: Variable frequency and volume
- **Use Cases**: Music playback, variable tones, sound effects

### Speaker (8Ω)
**Description**: Small speaker for audio output, requires amplifier circuit for proper operation.
- **Impedance**: 8Ω typical
- **Power**: 0.5W to 2W
- **Interface**: Analog audio signal
- **Use Cases**: Audio playback, voice output, music

---

## 📺 Display Components

### LCD Display (16x2)
**Description**: Character-based liquid crystal display showing 2 rows of 16 characters each.
- **Interface**: Parallel (6-pin) or I2C (4-pin with backpack)
- **Characters**: 5x8 dot matrix, custom characters supported
- **Backlight**: Optional LED backlight
- **Use Cases**: Status displays, menus, data logging

### OLED Display (128x64)
**Description**: Organic LED display with high contrast and wide viewing angle, no backlight needed.
- **Resolution**: 128x64 pixels monochrome
- **Interface**: I2C or SPI
- **Features**: High contrast, fast response, low power
- **Use Cases**: Graphics displays, menus, data visualization

### TFT Display (320x240)
**Description**: Color thin-film transistor display with touch capability option.
- **Resolution**: 320x240 pixels, 65k colors
- **Interface**: SPI with additional control pins
- **Features**: Touch screen option, SD card slot
- **Use Cases**: User interfaces, graphics, control panels

---

## ⚡ Power & Control Components

### Relay Module
**Description**: Electrically operated switch allowing low-voltage control of high-voltage/current circuits.
- **Coil Voltage**: 3.3V or 5V
- **Contact Rating**: 10A at 250VAC, 10A at 30VDC
- **Features**: LED indicator, flyback diode protection
- **Use Cases**: AC appliance control, high-current switching

### Transistor (NPN/PNP)
**Description**: Semiconductor device for switching and amplification, available in NPN and PNP types.
- **Types**: 2N2222 (NPN), 2N2907 (PNP)
- **Current**: Up to 800mA collector current
- **Voltage**: Up to 40V collector-emitter
- **Use Cases**: Switching, amplification, logic circuits

### MOSFET
**Description**: Metal-oxide-semiconductor field-effect transistor for efficient switching of high currents.
- **Types**: N-channel, P-channel
- **Current**: Up to 30A continuous
- **Voltage**: Up to 60V drain-source
- **Use Cases**: Motor control, LED drivers, power switching

---

## 🔄 Motors & Actuators

### Servo Motor (SG90)
**Description**: Precise position-controlled motor with built-in control circuit, 180-degree rotation.
- **Rotation**: 180 degrees (0-180°)
- **Control**: PWM signal (1-2ms pulse width)
- **Torque**: 2.5kg⋅cm at 4.8V
- **Use Cases**: Robotics, camera gimbals, control surfaces

### Stepper Motor (28BYJ-48)
**Description**: Motor that moves in discrete steps, providing precise position control without feedback.
- **Steps**: 2048 steps per revolution (with gear reduction)
- **Driver**: ULN2003 driver board included
- **Voltage**: 5V operation
- **Use Cases**: 3D printers, CNC machines, precise positioning

### DC Motor
**Description**: Simple motor providing continuous rotation, speed controlled by voltage.
- **Voltage**: 3V-12V operation
- **Speed**: Variable with voltage
- **Driver**: H-bridge required for direction control
- **Use Cases**: Wheels, fans, pumps, general rotation

---

## 🔌 Communication Components

### WiFi Module (ESP8266)
**Description**: Low-cost WiFi microchip with full TCP/IP stack and microcontroller capability.
- **Standards**: 802.11 b/g/n WiFi
- **Interface**: UART, SPI, I2C
- **Features**: Station/AP modes, WPA/WPA2 security
- **Use Cases**: IoT connectivity, web servers, remote control

### Bluetooth Module (HC-05)
**Description**: Bluetooth 2.0 module for wireless serial communication.
- **Range**: 10 meters (Class 2)
- **Interface**: UART (serial communication)
- **Features**: Master/slave modes, AT command configuration
- **Use Cases**: Wireless data transfer, remote control, sensor networks

### NRF24L01 (2.4GHz Radio)
**Description**: Low-power 2.4GHz transceiver for wireless communication between microcontrollers.
- **Range**: Up to 100 meters (with antenna)
- **Interface**: SPI communication
- **Features**: Multi-channel, auto-acknowledgment, retransmission
- **Use Cases**: Sensor networks, remote control, mesh networks

---

## 🔧 Passive Components

### Resistor
**Description**: Component that limits current flow, available in various values and power ratings.
- **Values**: 1Ω to 10MΩ (E12/E24 series)
- **Tolerance**: ±1%, ±5%, ±10%
- **Power**: 1/4W, 1/2W, 1W ratings
- **Use Cases**: Current limiting, voltage division, pull-up/pull-down

### Capacitor
**Description**: Component that stores electrical energy, available in ceramic, electrolytic, and tantalum types.
- **Types**: Ceramic (pF-µF), electrolytic (µF-mF), tantalum
- **Voltage**: 6.3V to 450V ratings
- **Features**: Polarized (electrolytic) vs non-polarized (ceramic)
- **Use Cases**: Filtering, timing circuits, energy storage

### Inductor
**Description**: Component that stores energy in magnetic field, opposes changes in current.
- **Values**: µH to mH range
- **Current**: Various current ratings
- **Features**: Core materials (air, ferrite, iron)
- **Use Cases**: Filtering, energy storage, oscillators

### Potentiometer
**Description**: Variable resistor with three terminals, allowing adjustable resistance.
- **Values**: 1kΩ to 1MΩ typical
- **Types**: Linear, logarithmic (audio) taper
- **Interface**: Analog input reading
- **Use Cases**: Volume control, brightness adjustment, parameter tuning

---

## 🔋 Power Components

### Battery Holder
**Description**: Mechanical holder for batteries, various configurations available.
- **Types**: AA, AAA, 9V, coin cell holders
- **Configuration**: Single cell to multi-cell packs
- **Features**: Switch integration, wire leads
- **Use Cases**: Portable power, backup power

### Voltage Regulator (LM7805)
**Description**: Linear voltage regulator providing stable 5V output from higher input voltage.
- **Input**: 7V-35V DC
- **Output**: 5V DC, up to 1A
- **Features**: Thermal shutdown, current limiting
- **Use Cases**: Power supplies, voltage conversion

### Power Supply Module
**Description**: Switching power supply providing regulated voltage from AC mains or DC input.
- **Input**: 85-264VAC or 12-24VDC
- **Output**: 3.3V, 5V, 12V options
- **Current**: 1A to 10A ratings
- **Use Cases**: Project power, bench supplies

---

## 🧮 Logic & Memory Components

### Shift Register (74HC595)
**Description**: Serial-to-parallel converter expanding digital outputs using SPI-like interface.
- **Outputs**: 8 parallel outputs from 3 control pins
- **Features**: Cascadable, output enable, storage register
- **Interface**: Serial data, clock, latch pins
- **Use Cases**: LED matrices, digit displays, GPIO expansion

### Multiplexer (74HC4051)
**Description**: Analog multiplexer allowing one input to select from 8 analog channels.
- **Channels**: 8 analog inputs/outputs
- **Control**: 3 digital select pins
- **Features**: Bidirectional operation
- **Use Cases**: Sensor multiplexing, analog input expansion

---

## 🔍 Specialized Components

### Real-Time Clock (DS3231)
**Description**: Precision real-time clock with temperature-compensated crystal oscillator.
- **Interface**: I2C communication
- **Features**: Battery backup, alarms, 32kHz output
- **Accuracy**: ±2ppm (±1 minute per year)
- **Use Cases**: Data logging, scheduling, time-based control

### SD Card Module
**Description**: Interface module for reading/writing SD cards for data storage.
- **Interface**: SPI communication
- **Compatibility**: SD, SDHC cards up to 32GB
- **Features**: 3.3V/5V level shifting
- **Use Cases**: Data logging, file storage, configuration

### GPS Module (NEO-6M)
**Description**: Global positioning system receiver providing location and time data.
- **Interface**: UART (serial communication)
- **Accuracy**: 2.5m CEP (50% probability)
- **Features**: NMEA protocol, backup battery
- **Use Cases**: Location tracking, navigation, timing

---

## 🎛️ Custom Components

### Breadboard
**Description**: Solderless prototyping board for temporary circuit connections.
- **Size**: Half-size (400 tie points), full-size (830 tie points)
- **Features**: Power rails, numbered rows/columns
- **Use Cases**: Prototyping, testing, education

### Jumper Wires
**Description**: Pre-made wires for connecting components and breadboards.
- **Types**: Male-male, male-female, female-female
- **Length**: 10cm, 20cm standard lengths
- **Colors**: Multiple colors for organization
- **Use Cases**: Connections, prototyping, testing

---

## 📊 Implementation Status

| Component Category | Phase | Priority | Status |
|-------------------|-------|----------|--------|
| ESP32 DevKit | 1 | High | ✅ Completed |
| LED | 1 | High | 🔄 In Progress |
| Push Button | 1 | High | 📋 Planned |
| Resistor | 1 | High | 📋 Planned |
| DHT22 Sensor | 1 | Medium | 📋 Planned |
| LCD Display | 2 | Medium | 📋 Planned |
| Servo Motor | 2 | Medium | 📋 Planned |
| All Others | 3+ | Low | 📋 Planned |

---

## 🔮 Future Expansion

- **Custom Components**: User-defined components with custom properties
- **Component Libraries**: Importable component packs
- **3D Models**: 3D visualization of components
- **Datasheets**: Integrated component documentation
- **Simulation Models**: Behavioral models for each component
- **Arduino Libraries**: Associated code libraries for each component

---

*This catalog will be continuously updated as new components are added to the CodeNWire platform.*
