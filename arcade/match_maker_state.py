import random
from typing import List, Optional, Tuple, Dict, Any

GRID_SIZE = 7
GEM_TYPES = ['heart', 'star', 'cross', 'flame', 'drop']

def random_gem() -> str:
    return random.choice(GEM_TYPES)

def create_initial_grid() -> List[List[str]]:
    grid = [[None for _ in range(GRID_SIZE)] for _ in range(GRID_SIZE)]
    for r in range(GRID_SIZE):
        for c in range(GRID_SIZE):
            while True:
                gem = random_gem()
                horizontal_match = (c >= 2 and grid[r][c - 1] == gem and grid[r][c - 2] == gem)
                vertical_match = (r >= 2 and grid[r - 1][c] == gem and grid[r - 2][c] == gem)
                if not horizontal_match and not vertical_match:
                    grid[r][c] = gem
                    break
    return grid

def can_swap(r1: int, c1: int, r2: int, c2: int) -> bool:
    row_diff = abs(r1 - r2)
    col_diff = abs(c1 - c2)
    return (row_diff == 1 and col_diff == 0) or (row_diff == 0 and col_diff == 1)

def apply_swap(grid: List[List[str]], r1: int, c1: int, r2: int, c2: int) -> List[List[str]]:
    next_grid = [row[:] for row in grid]
    next_grid[r1][c1], next_grid[r2][c2] = next_grid[r2][c2], next_grid[r1][c1]
    return next_grid

def find_matches(grid: List[List[str]]) -> List[Dict[str, Any]]:
    matches = []
    
    # Horizontal matches
    for r in range(GRID_SIZE):
        run = 1
        for c in range(1, GRID_SIZE):
            if grid[r][c] and grid[r][c] == grid[r][c - 1]:
                run += 1
            else:
                if run >= 3:
                    cells = [{"r": r, "c": k} for k in range(c - run, c)]
                    matches.append({"orientation": "horizontal", "cells": cells})
                run = 1
        if run >= 3:
            cells = [{"r": r, "c": k} for k in range(GRID_SIZE - run, GRID_SIZE)]
            matches.append({"orientation": "horizontal", "cells": cells})

    # Vertical matches
    for c in range(GRID_SIZE):
        run = 1
        for r in range(1, GRID_SIZE):
            if grid[r][c] and grid[r][c] == grid[r - 1][c]:
                run += 1
            else:
                if run >= 3:
                    cells = [{"r": k, "c": c} for k in range(r - run, r)]
                    matches.append({"orientation": "vertical", "cells": cells})
                run = 1
        if run >= 3:
            cells = [{"r": k, "c": c} for k in range(GRID_SIZE - run, GRID_SIZE)]
            matches.append({"orientation": "vertical", "cells": cells})

    return matches

def apply_gravity(grid: List[List[str]]) -> List[List[str]]:
    next_grid = [row[:] for row in grid]
    for c in range(GRID_SIZE):
        gems = [next_grid[r][c] for r in range(GRID_SIZE - 1, -1, -1) if next_grid[r][c] is not None]
        for r in range(GRID_SIZE - 1, -1, -1):
            next_grid[r][c] = gems.pop(0) if gems else random_gem()
    return next_grid
