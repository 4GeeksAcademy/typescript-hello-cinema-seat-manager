// Cinema Seat Manager

// Creates and returns an 8x10 2D array where every seat is initialized to 0 (available)
function initializeSeatMatrix(): number[][] {
  return Array.from({ length: 8 }, () => Array(10).fill(0));
}

// Marks a seat as occupied (1) if available, returning a success or failure message
function reserveSeat(matrix: number[][], row: number, col: number): string {
  if (matrix[row][col] === 1) {
    return `Seat (${row}, ${col}) is already occupied.`;
  }
  matrix[row][col] = 1;
  return `Seat (${row}, ${col}) successfully reserved.`;
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

// Prints the seat matrix with column numbers as a header and row numbers on each row; X = occupied, L = available
function displaySeatMatrix(matrix: number[][]): void {
  console.log("  " + Array.from({ length: 10 }, (_, i) => i).join(" "));
  matrix.forEach((row, rowIndex) => {
    console.log(rowIndex + " " + row.map(seat => (seat === 1 ? "X" : "L")).join(" "));
  });
}

// Main Program - Testing all scenarios

// --- Scenario 1: Empty Room ---
console.log("=== Scenario 1: Empty Room ===");
const matrix1 = initializeSeatMatrix();
displaySeatMatrix(matrix1);
console.log("Availability:", countAvailability(matrix1));
console.log("Adjacent seats:", findAdjacentSeats(matrix1));

// --- Scenario 2: Partially Filled Room ---
console.log("\n=== Scenario 2: Partially Filled Room ===");
const matrix2 = initializeSeatMatrix();
console.log(reserveSeat(matrix2, 0, 0));
console.log(reserveSeat(matrix2, 0, 1));
console.log(reserveSeat(matrix2, 2, 5));
console.log(reserveSeat(matrix2, 3, 3));
console.log(reserveSeat(matrix2, 0, 1)); // already occupied
displaySeatMatrix(matrix2);
console.log("Availability:", countAvailability(matrix2));
console.log("Adjacent seats:", findAdjacentSeats(matrix2));

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
console.log("Availability:", countAvailability(matrix3));
console.log("Adjacent seats:", findAdjacentSeats(matrix3));

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
console.log("Availability:", countAvailability(matrix4));
console.log("Adjacent seats:", findAdjacentSeats(matrix4));
