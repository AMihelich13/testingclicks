// Dartball board layout - baseball diamond rotated 45 degrees
// The board has 4 main quadrants (bases) plus center diamond area

class DartboardMapper {
    constructor() {
        this.canvas = document.getElementById('clickCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.image = document.getElementById('dartboard');
        this.resultDiv = document.getElementById('result');
        this.coordinatesDiv = document.getElementById('coordinates');
        
        this.centerX = 0;
        this.centerY = 0;
        this.scale = 1;
        
        this.init();
    }
    
    init() {
        // Wait for image to load
        this.image.onload = () => {
            this.setupCanvas();
            this.attachEventListeners();
        };
        
        // If image is already loaded
        if (this.image.complete) {
            this.setupCanvas();
            this.attachEventListeners();
        }
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.setupCanvas();
        });
    }
    
    setupCanvas() {
        const rect = this.image.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
        
        // Calculate center and scale based on displayed size
        this.centerX = rect.width / 2;
        this.centerY = rect.height / 2;
        this.scale = rect.width / 900; // Original image is 900x900
    }
    
    attachEventListeners() {
        this.canvas.addEventListener('click', (e) => {
            this.handleClick(e);
        });
        
        this.canvas.addEventListener('mousemove', (e) => {
            this.handleMouseMove(e);
        });
    }
    
    handleClick(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const area = this.identifyArea(x, y);
        this.displayResult(area, x, y);
        this.drawClickPoint(x, y);
    }
    
    handleMouseMove(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Update coordinates display
        this.coordinatesDiv.textContent = `Mouse Position: (${Math.round(x)}, ${Math.round(y)})`;
    }
    
    identifyArea(x, y) {
        // Calculate distance from center
        const dx = x - this.centerX;
        const dy = y - this.centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Calculate angle (0 degrees at top, clockwise)
        let angle = Math.atan2(dx, -dy) * (180 / Math.PI);
        if (angle < 0) angle += 360;
        
        // Define radii for different zones (scaled to current display size)
        const centerDiamondRadius = 80 * this.scale;  // Center diamond (SH/2BS/DP area)
        const innerDiamondRadius = 180 * this.scale;  // Strike/Ball zones
        const outerRadius = 350 * this.scale;         // Out/Foul zones
        const maxRadius = 450 * this.scale;           // Edge of board
        
        // Center diamond area (SH, 2BS, DP)
        if (distance <= centerDiamondRadius) {
            // Determine which part of center diamond based on angle
            if (angle >= 315 || angle < 45) {
                return {
                    area: '2-Base Hit',
                    points: 2,
                    segment: null,
                    description: '2BS - Double (advances runner 2 bases)'
                };
            } else if (angle >= 45 && angle < 135) {
                return {
                    area: 'Double Play',
                    points: -1,
                    segment: null,
                    description: 'DP - Double Play (out + runner out)'
                };
            } else if (angle >= 135 && angle < 225) {
                return {
                    area: 'Sacrifice Hit',
                    points: 0,
                    segment: null,
                    description: 'SH - Sacrifice (advances runner, batter out)'
                };
            } else {
                return {
                    area: 'Sacrifice Hit',
                    points: 0,
                    segment: null,
                    description: 'SH - Sacrifice (advances runner, batter out)'
                };
            }
        }
        
        // Inner diamond area (Strike/Ball zones)
        if (distance <= innerDiamondRadius) {
            // Determine which base area (rotated 45 degrees)
            if (angle >= 315 || angle < 45) {
                // Top - Second base area
                if (Math.abs(dx) < 60 * this.scale) {
                    return {
                        area: 'Ball (2nd Base)',
                        points: 0,
                        segment: 'B',
                        description: 'BALL - No score'
                    };
                } else {
                    return {
                        area: 'Strike (2nd Base)',
                        points: 0,
                        segment: 'Strike',
                        description: 'STRIKE - No score'
                    };
                }
            } else if (angle >= 45 && angle < 135) {
                // Right - First base area
                if (Math.abs(dy) < 60 * this.scale) {
                    return {
                        area: 'Ball (1st Base)',
                        points: 0,
                        segment: 'B',
                        description: 'BALL - No score'
                    };
                } else {
                    return {
                        area: 'Strike (1st Base)',
                        points: 0,
                        segment: 'Strike',
                        description: 'STRIKE - No score'
                    };
                }
            } else if (angle >= 135 && angle < 225) {
                // Bottom - Home plate area
                if (Math.abs(dx) < 60 * this.scale) {
                    return {
                        area: 'Ball (Home)',
                        points: 0,
                        segment: 'B',
                        description: 'BALL - No score'
                    };
                } else {
                    return {
                        area: 'Strike (Home)',
                        points: 0,
                        segment: 'Strike',
                        description: 'STRIKE - No score'
                    };
                }
            } else {
                // Left - Third base area
                if (Math.abs(dy) < 60 * this.scale) {
                    return {
                        area: 'Ball (3rd Base)',
                        points: 0,
                        segment: 'B',
                        description: 'BALL - No score'
                    };
                } else {
                    return {
                        area: 'Strike (3rd Base)',
                        points: 0,
                        segment: 'Strike',
                        description: 'STRIKE - No score'
                    };
                }
            }
        }
        
        // Outer zones (Out/Foul/Ball numbers)
        if (distance <= outerRadius) {
            // Determine base position
            if (angle >= 315 || angle < 45) {
                // Top - 2nd base
                if (dx > 0) {
                    return {
                        area: 'Out (2nd Base Right)',
                        points: -1,
                        segment: 'Out',
                        description: 'OUT - Batter is out'
                    };
                } else {
                    return {
                        area: 'Out (2nd Base Left)',
                        points: -1,
                        segment: 'Out',
                        description: 'OUT - Batter is out'
                    };
                }
            } else if (angle >= 45 && angle < 135) {
                // Right - 1st base
                // Determine if it's Ball number or Out/Foul
                if (angle >= 60 && angle < 80 && distance > 220 * this.scale) {
                    return {
                        area: 'Ball 1',
                        points: 1,
                        segment: '1',
                        description: '1 - Single (advances 1 base)'
                    };
                } else if (dy < 0) {
                    return {
                        area: 'Out (1st Base)',
                        points: -1,
                        segment: 'Out',
                        description: 'OUT - Batter is out'
                    };
                } else {
                    return {
                        area: 'Foul (1st Base)',
                        points: 0,
                        segment: 'Foul',
                        description: 'FOUL - Strike if less than 2 strikes'
                    };
                }
            } else if (angle >= 135 && angle < 225) {
                // Bottom - Home plate
                if (dx < 0) {
                    return {
                        area: 'Foul (Home Left)',
                        points: 0,
                        segment: 'Foul',
                        description: 'FOUL - Strike if less than 2 strikes'
                    };
                } else {
                    return {
                        area: 'Foul (Home Right)',
                        points: 0,
                        segment: 'Foul',
                        description: 'FOUL - Strike if less than 2 strikes'
                    };
                }
            } else {
                // Left - 3rd base
                // Determine if it's Ball number or Out/Foul
                if (angle >= 280 && angle < 300 && distance > 220 * this.scale) {
                    return {
                        area: 'Ball 3',
                        points: 1,
                        segment: '3',
                        description: '3 - Single (advances 1 base)'
                    };
                } else if (dy > 0) {
                    return {
                        area: 'Out (3rd Base)',
                        points: -1,
                        segment: 'Out',
                        description: 'OUT - Batter is out'
                    };
                } else {
                    return {
                        area: 'Foul (3rd Base)',
                        points: 0,
                        segment: 'Foul',
                        description: 'FOUL - Strike if less than 2 strikes'
                    };
                }
            }
        }
        
        // Corner areas (green background - Out/Foul zones)
        if (distance <= maxRadius) {
            // Check which corner
            if (angle >= 315 || angle < 45) {
                return {
                    area: 'Out (Top)',
                    points: -1,
                    segment: 'Out',
                    description: 'OUT - Batter is out'
                };
            } else if (angle >= 45 && angle < 135) {
                return {
                    area: 'Foul (Right)',
                    points: 0,
                    segment: 'Foul',
                    description: 'FOUL - Strike if less than 2 strikes'
                };
            } else if (angle >= 135 && angle < 225) {
                return {
                    area: 'Home Run',
                    points: 4,
                    segment: 'HR',
                    description: 'HR - Home Run (all runners score)'
                };
            } else {
                return {
                    area: 'Foul (Left)',
                    points: 0,
                    segment: 'Foul',
                    description: 'FOUL - Strike if less than 2 strikes'
                };
            }
        }
        
        return {
            area: 'Outside Board',
            points: 0,
            segment: null,
            description: 'Outside the dartball board'
        };
    }
    
    displayResult(areaInfo, x, y) {
        this.resultDiv.innerHTML = `
            <strong>Area:</strong> ${areaInfo.area}<br>
            <strong>Score:</strong> ${areaInfo.points} points<br>
            <strong>Description:</strong> ${areaInfo.description}
        `;
        
        this.coordinatesDiv.textContent = `Click Position: (${Math.round(x)}, ${Math.round(y)})`;
    }
    
    drawClickPoint(x, y) {
        // Clear previous drawings
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw click point
        this.ctx.beginPath();
        this.ctx.arc(x, y, 5, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'rgba(255, 0, 0, 0.7)';
        this.ctx.fill();
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        // Draw crosshair
        this.ctx.beginPath();
        this.ctx.moveTo(x - 10, y);
        this.ctx.lineTo(x + 10, y);
        this.ctx.moveTo(x, y - 10);
        this.ctx.lineTo(x, y + 10);
        this.ctx.strokeStyle = 'rgba(255, 0, 0, 0.7)';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }
}

// Initialize the dartboard mapper when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new DartboardMapper();
});
