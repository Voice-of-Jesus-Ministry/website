import java.util.*;

public class MatchMakerState {
    public static final int GRID_SIZE = 7;
    private static final List<String> GEM_TYPES = Arrays.asList("heart", "star", "cross", "flame", "drop");
    private static final Random RANDOM = new Random();

    public static class Position {
        public int r, c;
        public Position(int r, int c) { this.r = r; this.c = c; }
    }

    public static String[][] createInitialGrid() {
        String[][] grid = new String[GRID_SIZE][GRID_SIZE];
        for (int r = 0; r < GRID_SIZE; r++) {
            for (int c = 0; c < GRID_SIZE; c++) {
                String gem;
                boolean match;
                do {
                    gem = GEM_TYPES.get(RANDOM.nextInt(GEM_TYPES.size()));
                    boolean hMatch = (c >= 2 && gem.equals(grid[r][c - 1]) && gem.equals(grid[r][c - 2]));
                    boolean vMatch = (r >= 2 && gem.equals(grid[r - 1][c]) && gem.equals(grid[r - 2][c]));
                    match = hMatch || vMatch;
                } while (match);
                grid[r][c] = gem;
            }
        }
        return grid;
    }

    public static boolean canSwap(int r1, int c1, int r2, int c2) {
        int rowDiff = Math.abs(r1 - r2);
        int colDiff = Math.abs(c1 - c2);
        return (rowDiff == 1 && colDiff == 0) || (rowDiff == 0 && colDiff == 1);
    }

    public static String[][] applyGravity(String[][] grid) {
        String[][] next = new String[GRID_SIZE][GRID_SIZE];
        for (int r = 0; r < GRID_SIZE; r++) {
            next[r] = Arrays.copyOf(grid[r], GRID_SIZE);
        }

        for (int c = 0; c < GRID_SIZE; c++) {
            List<String> gems = new ArrayList<>();
            for (int r = GRID_SIZE - 1; r >= 0; r--) {
                if (next[r][c] != null) {
                    gems.add(next[r][c]);
                }
            }
            int gemIndex = 0;
            for (int r = GRID_SIZE - 1; r >= 0; r--) {
                if (gemIndex < gems.size()) {
                    next[r][c] = gems.get(gemIndex++);
                } else {
                    next[r][c] = GEM_TYPES.get(RANDOM.nextInt(GEM_TYPES.size()));
                }
            }
        }
        return next;
    }
}
