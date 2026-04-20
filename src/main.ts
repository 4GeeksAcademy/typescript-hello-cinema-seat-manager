// Cinema Seat Manager

// Creates and returns an 8x10 2D array where every seat is initialized to 0 (available)
function initializeSeatMatrix(): number[][] {
  return Array.from({ length: 8 }, () => Array(10).fill(0));
}

// Marks a seat as occupied (1) if available, returning a success or failure message
function reserveSeat(matrix: number[][], row: number, col: number): string {
  if (matrix[row][col] === 1) {
    return `Seat (${row + 1}, ${col + 1}) is already occupied.`;
  }
  matrix[row][col] = 1;
  return `Seat (${row + 1}, ${col + 1}) successfully reserved.`;
}

// Searches each row for the first pair of consecutive available seats, returning their position or null if none found
function findAdjacentSeats(matrix: number[][]): { row: number; col1: number; col2: number } | null {
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length - 1; c++) {
      if (matrix[r][c] === 0 && matrix[r][c + 1] === 0) {
        return { row: r, col1: c, col2: c + 1 };
      }
    }
  }
  return null;
}

// Counts and returns the number of occupied and available seats in the matrix
function countAvailability(matrix: number[][]): { occupied: number; available: number } {
  let occupied = 0;
  let available = 0;
  matrix.forEach(row => row.forEach(seat => (seat === 1 ? occupied++ : available++)));
  return { occupied, available };
}

// Prints the seat matrix with a styled header, bracketed seat labels, and column/row indices
function displaySeatMatrix(matrix: number[][]): void {
  const divider = "==========================================";
  console.log(divider);
  console.log("        CINEMA SEATING CHART");
  console.log(divider);
  console.log("    " + Array.from({ length: 10 }, (_, i) => String(i + 1).padStart(3).padEnd(5)).join(" "));
  matrix.forEach((row, rowIndex) => {
    const rowLabel = String(rowIndex + 1).padStart(2);
    console.log(rowLabel + "  " + row.map(seat => (seat === 1 ? "[ X ]" : "[ L ]")).join(" "));
  });
  console.log(divider);
}

// Main Program - Testing all scenarios

// --- Scenario 1: Empty Room ---
console.log("\n=== Scenario 1: Empty Room ===");
const matrix1 = initializeSeatMatrix();
displaySeatMatrix(matrix1);
const avail1 = countAvailability(matrix1);
console.log(`Occupied: ${avail1.occupied} | Available: ${avail1.available}`);
const adj1 = findAdjacentSeats(matrix1);
console.log("Adjacent seats:", adj1 ? { row: adj1.row + 1, col1: adj1.col1 + 1, col2: adj1.col2 + 1 } : null);

// --- Scenario 2: Partially Filled Room ---
console.log("\n=== Scenario 2: Partially Filled Room ===");
const matrix2 = initializeSeatMatrix();
console.log(reserveSeat(matrix2, 0, 0));
console.log(reserveSeat(matrix2, 0, 1));
console.log(reserveSeat(matrix2, 2, 5));
console.log(reserveSeat(matrix2, 3, 3));
console.log(reserveSeat(matrix2, 0, 1)); // already occupied
displaySeatMatrix(matrix2);
const avail2 = countAvailability(matrix2);
console.log(`Occupied: ${avail2.occupied} | Available: ${avail2.available}`);
const adj2 = findAdjacentSeats(matrix2);
console.log("Adjacent seats:", adj2 ? { row: adj2.row + 1, col1: adj2.col1 + 1, col2: adj2.col2 + 1 } : null);

// --- Scenario 3: Nearly Full Room ---
console.log("\n=== Scenario 3: Nearly Full Room ===");
const matrix3 = initializeSeatMatrix();
for (let r = 0; r < 8; r++) {
  for (let c = 0; c < 10; c++) {
    // Leave only row 7, col 8 and col 9 available
    if (!(r === 7 && c >= 8)) {
      matrix3[r][c] = 1;
    }
  }
}
displaySeatMatrix(matrix3);
const avail3 = countAvailability(matrix3);
console.log(`Occupied: ${avail3.occupied} | Available: ${avail3.available}`);
const adj3 = findAdjacentSeats(matrix3);
console.log("Adjacent seats:", adj3 ? { row: adj3.row + 1, col1: adj3.col1 + 1, col2: adj3.col2 + 1 } : null);

// --- Scenario 4: Full Room ---
console.log("\n=== Scenario 4: Full Room ===");
const matrix4 = initializeSeatMatrix();
for (let r = 0; r < 8; r++) {
  for (let c = 0; c < 10; c++) {
    matrix4[r][c] = 1;
  }
}
displaySeatMatrix(matrix4);
console.log(reserveSeat(matrix4, 0, 0)); // all occupied
const avail4 = countAvailability(matrix4);
console.log(`Occupied: ${avail4.occupied} | Available: ${avail4.available}`);
console.log("Adjacent seats:", findAdjacentSeats(matrix4));
