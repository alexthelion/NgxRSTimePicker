# NgxRSTimePicker
This is a simple Angular Time Picker

![Demo Image](https://github.com/alexthelion/NgxRSTimePicker/blob/master/images/picktime.png?raw=true)
![Dark Mode Image](https://github.com/alexthelion/NgxRSTimePicker/blob/master/images/picktimedark.png?raw=true)

## Available Inputs:
* pickTimeText - Text of pick time button
* date - Date object for setting hour and time
* primaryColor - Color of the selected hour, minute, and the pick time background color
* backgroundColor - Time Picker container background color
* textColor - Text Color (Digits etc.)
* inputControlBackgroundColor - Hour and Minutes input background color
* width - Container width
* manualInput - Toggle display manual input
* maxHours - Max hours (apply custom max number for hours)

## Installation
* `npm i ngx-rs-time-picker`

### Demo
https://rs-time-picker-demo.firebaseapp.com

### Usage

Import the NgxRsTimePickerModule module in app module
Then use it in your own component:

<ngx-rs-time-picker [primaryColor]="'red'"
[maxHours]="24"
[manualInput]="true"
[enableAnimation]="true"></ngx-rs-time-picker>

### Created By RSinnotech Team
Visit us at: www.rsinnotech.com
