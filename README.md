# Dartball Board Click Mapper

An interactive web application that maps mouse clicks on a dartball board image (baseball-style dartboard) to identify which play or area was clicked.

## Features

- **Interactive Click Detection**: Click anywhere on the dartball board to identify the play
- **Baseball Scoring System**: Displays the play result based on dartball rules
- **Visual Feedback**: Shows a red marker with crosshair at the click location
- **Real-time Coordinates**: Displays mouse position as you move over the board
- **Responsive Design**: Works on different screen sizes

## Dartball Board Areas

The application recognizes the following areas based on baseball rules:

### Center Diamond
- **SH (Sacrifice Hit)**: Advances runner, batter is out
- **2BS (2-Base Hit)**: Double - advances runner 2 bases
- **DP (Double Play)**: Batter and runner are both out

### Inner Diamond (Strike/Ball Zones)
- **Strike Zones**: Gray areas marked "STRIKE" - counts as a strike
- **Ball Zones**: Blue areas marked "BALL" (B) - counts as a ball

### Outer Areas
- **Singles (1, 3)**: White numbered areas - advances 1 base
- **Out Zones**: Orange areas marked "OUT" - batter is out
- **Foul Zones**: Green areas marked "FOUL" - counts as strike if less than 2 strikes
- **HR (Home Run)**: Bottom area - all runners score

## How to Use

1. **Open the Application**
   - Open `index.html` in a web browser
   - Or serve the files using a local web server

2. **Interact with the Dartball Board**
   - Click anywhere on the dartball board image
   - The application will display:
     - The play result (e.g., "Strike", "Out", "Ball 1", "2-Base Hit")
     - The scoring value
     - A description of what the play means in baseball terms
     - The exact coordinates of your click

3. **View Results**
   - Results appear in the "Play Result" panel below the dartball board
   - A red marker with crosshair shows where you clicked on the board
   - The legend at the bottom explains all the different areas

## Files

- `index.html` - Main HTML structure
- `styles.css` - Styling and layout
- `app.js` - Click detection and mapping logic
- `Dartball-Dartboard-2.gif` - The dartball board image (900x900 pixels)

## Technical Details

The application uses:
- **Canvas API** for drawing click markers
- **Geometric calculations** to determine which area was clicked based on:
  - Distance from center (for ring identification)
  - Angle from center (for segment identification)
- **Responsive scaling** to work with different screen sizes

### Dartball Board Layout

The dartball board is arranged as a baseball diamond rotated 45 degrees:
- **Center diamond** with special plays (SH, 2BS, DP)
- **Four bases** (Home, 1st, 2nd, 3rd) with strike/ball zones
- **Outer areas** with outs, fouls, and single-hit zones
- **Corner areas** including home run zone

## Browser Compatibility

Works in all modern browsers that support:
- HTML5 Canvas
- ES6 JavaScript
- CSS3

## Local Development

To run locally:

```bash
# Option 1: Using Python
python -m http.server 8000

# Option 2: Using Node.js
npx http-server

# Option 3: Simply open the file
# Just open index.html in your browser
```

Then navigate to `http://localhost:8000` in your browser.

## License

This project is open source and available for educational purposes.
