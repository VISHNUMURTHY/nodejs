// all-monster-sorts.c - Sort monsters by name and weight.
/* The idea of sorting is simple: take unordered objects, and arrange them in an
 order. It has a lot of uses, so there's been a lot of work done with it. Here,
 we're going to demonstrate a few of the simpler, more classic sorting
 techniques.
 */
#include <limits.h>
#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

/* Monster structure and helper functions - DO NOT MODIFY THESE. */
typedef struct monster {
  int id;
  char name[64];
  char element[64];
  int population;
  double weight;
} monster;

monster *make_some_monsters(int n) {
  monster *monsters = malloc(sizeof(monster) * n);
  time_t t;
  srand((unsigned)time(&t));
  for (int i = 0; i < n; i++) {
    monsters[i].id = i;
    sprintf(monsters[i].name, "Monster #%d", rand());
    sprintf(monsters[i].element, "Element #%d", rand());
    monsters[i].population = rand();
    monsters[i].weight = 500.0 * ((double)rand() / (double)RAND_MAX);
  }
  return monsters;
}

void output_monster_list(monster *list, int n, char *title) {
  printf("List %s:\n", title);
  for (int i = 0; i < n; i++) {
    printf(" Monster %d: %s %s %d %lf\n", i, list[i].name, list[i].element,
           list[i].population, list[i].weight);
  }
  printf("\n");
}

void print_clocks(clock_t clocks) {
  printf(" %lfs CPU time used\n", ((double)clocks) / CLOCKS_PER_SEC);
}

void swap_monsters(monster *list, int i, int j) {
  monster temp;
  memcpy(&temp, list + i, sizeof(monster));
  memcpy(list + i, list + j, sizeof(monster));
  memcpy(list + j, &temp, sizeof(monster));
}

void check_monster_sort(monster *list, int n, int use_name, int use_weight) {
  for (int i = 1; i < n; i++) {
    if (compare_monsters(list + i - 1, list + i, use_name, use_weight) > 0) {
      printf("*** The list is NOT sorted.\n\n");
      return;
    }
  }
  printf("The list is sorted.\n\n");
}

/* The core comparison function. */
int compare_monsters(monster *m1, monster *m2, int use_name, int use_weight) {
  int val = 0;
  if (use_name == 1) {
    val = strcmp((*m1).name, (*m2).name);
  }
  if (use_weight == 1) {
    if ((*m1).weight > (*m2).weight) {
      val = 1;
    } else if ((*m1).weight < (*m2).weight) {
      val = -1;
    } else {
      val = 0;
    }
  }
  return val;
}

/* Implement ascending quick sort. */
int repartition(monster *list, int low_index, int high_index, int *comparisons,
                int *swaps, int use_name, int use_weight) {
  monster *pivot_value = malloc(sizeof(monster) * 1);
  pivot_value[0] = list[high_index];
  int i = low_index;
  for (int j = low_index; j < high_index; j++) {
    (*comparisons)++;
    if (use_name == 1) {
      if (strcmp(list[j].name, pivot_value[0].name) < 0) {
        (*swaps)++;
        swap_monsters(list, i, j);
        i++;
      }
    }
    if (use_weight == 1) {
      if (list[j].weight < pivot_value[0].weight) {
        (*swaps)++;
        swap_monsters(list, i, j);
        i++;
      }
    }
  }
  (*swaps)++;
  swap_monsters(list, i, high_index);
  free(pivot_value);
  return i;
}

/* Recursive function for quick sort. */
void quick_sort_recursive(monster *list, int low_index, int high_index,
                          int *comparisons, int *swaps, int use_name,
                          int use_weight) {
  int pivot_index = repartition(list, low_index, high_index, comparisons, swaps,
                                use_name, use_weight);

  if (pivot_index - 1 > low_index)
    quick_sort_recursive(list, low_index, pivot_index - 1, comparisons, swaps,
                         use_name, use_weight);
  if (high_index > pivot_index + 1)
    quick_sort_recursive(list, pivot_index + 1, high_index, comparisons, swaps,
                         use_name, use_weight);
}

/* Shell function for quick sort. */
void quick_sort(monster *list, int n, int use_name, int use_weight) {
  int comparisons = 0;
  int swaps = 0;
  clock_t start_cpu, end_cpu;
  printf("Quick sort %d monsters by %s...\n", n, use_name ? "name" : "weight");
  start_cpu = clock();
  quick_sort_recursive(list, 0, n - 1, &comparisons, &swaps, use_name,
                       use_weight);
  end_cpu = clock();
  printf("Sort complete with %d comparisons and %d swaps.\n", comparisons,
         swaps);
  print_clocks(end_cpu - start_cpu);
}

/* Implement ascending bubble sort. */
void bubble_sort(monster *list, int n, int use_name, int use_weight) {
  int i;
  int j;
  int temp;
  int comparisons = 0;
  int swaps = 0;
  clock_t start_cpu, end_cpu;
  printf("Bubble sort %d monsters by %s...\n", n, use_name ? "name" : "weight");
  start_cpu = clock();
  for (i = n - 1; i >= 0; i--) {
    for (j = 0; j < i; j++) {
      comparisons++;
      if (use_name == 1) {
        if (strcmp(list[j].name, list[j + 1].name) > 0) {
          swaps++;
          swap_monsters(list, j, j + 1);
        }
      }
      if (use_weight == 1) {
        if (list[j].weight > list[j + 1].weight) {
          swaps++;
          swap_monsters(list, j, j + 1);
        }
      }
    }
  }
  end_cpu = clock();
  printf("Sort complete with %d comparisons and %d swaps.\n", comparisons,
         swaps);
  print_clocks(end_cpu - start_cpu);
}

/* Highest-value finder for selection sort. */
int find_highest(monster *list, int n, int *comparisons, int use_name,
                 int use_weight) {
  monster *highest_val = malloc(sizeof(monster) * 1);
  highest_val[0] = list[0];
  int highest_loc = -1;
  int i;
  for (i = 0; i <= n; i++) {
    (*comparisons)++;
    if (use_name == 1) {
      if (strcmp(list[i].name, highest_val[0].name) > 0) {
        highest_loc = i;
        highest_val[0] = list[i];
      }
    }
    if (use_weight == 1) {
      if (list[i].weight > highest_val[0].weight) {
        highest_loc = i;
        highest_val[0] = list[i];
      }
    }
  }
  free(highest_val);
  return highest_loc;
}

/* Implement ascending selection sort. */
void selection_sort(monster *list, int n, int use_name, int use_weight) {
  int i;
  int highest;
  int comparisons = 0;
  int swaps = 0;
  clock_t start_cpu, end_cpu;
  printf("Selection sort %d monsters by %s...\n", n,
         use_name ? "name" : "weight");
  start_cpu = clock();
  for (i = n - 1; i > 0; i--) {
    highest = find_highest(list, i, &comparisons, use_name, use_weight);
    if (highest != i) {
      swaps++;
      swap_monsters(list, highest, i);
    }
  }
  end_cpu = clock();
  printf("Sort complete with %d comparisons and %d swaps.\n", comparisons,
         swaps);
  print_clocks(end_cpu - start_cpu);
}

/* Find position for insertion sort. */
int insertion_sort_find_position(monster *list, int low_index, int high_index,
                                 monster *k, int *comparisons, int use_name,
                                 int use_weight) {
  int j;
  for (j = 0; j < high_index; j++) {
    (*comparisons)++;
    if (use_name == 1) {
      if (strcmp(list[j].name, (*k).name) > 0) {
        return j;
      }
    }
    if (use_weight == 1) {
      if (list[j].weight > (*k).weight) {
        return j;
      }
    }
  }
  return j;
}

/* Implement insertion sort. */
void insertion_sort_internal(monster *list, int n, int *comparisons,
                             int *copies, int *block_copies, int use_name,
                             int use_weight) {
  int i, j, m, temp;
  monster k;
  (*block_copies)++;
  for (i = 1; i < n; i++) {
    (*copies)++;
    k = list[i];
    j = 0;
    j = insertion_sort_find_position(list, 0, i, &k, comparisons, use_name,
                                     use_weight);
    if (j != i) {
      m = j;
      (*block_copies)++;
      for (j = i; j > m; j--) {
        list[j] = list[j - 1];
        (*copies)++;
      }
      (*copies)++;
      list[m] = k;
    }
  }
}

/* Shell for insertion sort. */
void insertion_sort(monster *list, int n, int use_name, int use_weight) {
  int comparisons = 0;
  int block_copies = 0;
  int total_copies = 0;
  clock_t start_cpu, end_cpu;
  printf("Insertion sort %d monsters by %s...\n", n,
         use_name ? "name" : "weight");
  start_cpu = clock();
  insertion_sort_internal(list, n, &comparisons, &total_copies, &block_copies,
                          use_name, use_weight);
  end_cpu = clock();
  printf("Sort complete with %d comparisons and %d block copies (%d total "
         "copies).\n",
         comparisons, block_copies, total_copies);
  print_clocks(end_cpu - start_cpu);
  return;
}

/* Merge function for merge sort. Merges sub-arrays [l1..h1] and [l2..h2].
 Must have l2 = l1 + 1 or bad things will happen. */
void merge_sort_merge(monster *list, int l1, int h1, int l2, int h2,
                      int *comparisons, int *copies, int *block_copies,
                      int *mallocs, int use_name, int use_weight) {
  monster *temp = malloc(sizeof(monster) * (h2 - l1 + 1));
  int index = l1;
  int k = l1;
  (*mallocs)++;
  (*block_copies)++;
  while (l1 <= h1 && l2 <= h2) {
    (*comparisons)++;
    if (use_name == 1) {
      if (strcmp(list[l1].name, list[l2].name) < 0) {
        (*copies)++;
        temp[index] = list[l1];
        l1 = l1 + 1;
      } else {
        (*copies)++;
        temp[index] = list[l2];
        l2 = l2 + 1;
      }
    }
    if (use_weight == 1) {
      if (list[l1].weight < list[l2].weight) {
        (*copies)++;
        temp[index] = list[l1];
        l1 = l1 + 1;
      } else {
        (*copies)++;
        temp[index] = list[l2];
        l2 = l2 + 1;
      }
    }
    index++;
  }

  if (l1 > h1) {
    (*block_copies)++;
    while (l2 <= h2) {
      (*copies)++;
      (*comparisons)++;
      temp[index] = list[l2];
      index++;
      l2++;
    }
  } else {
    (*block_copies)++;
    while (l1 <= h1) {
      (*copies)++;
      (*comparisons)++;
      temp[index] = list[l1];
      index++;
      l1++;
    }
  }

  (*block_copies)++;
  while (k < index) {
    (*copies)++;
    list[k] = temp[k];
    k++;
  }
  free(temp);
}

/* Recursive function for merge sort. */
void merge_sort_recursive(monster *list, int low_index, int high_index,
                          int *comparisons, int *copies, int *block_copies,
                          int *mallocs, int use_name, int use_weight) {
  int m;
  if (low_index < high_index) {
    m = (low_index + high_index) / 2;

    merge_sort_recursive(list, low_index, m, comparisons, copies, block_copies,
                         mallocs, use_name, use_weight);

    merge_sort_recursive(list, m + 1, high_index, comparisons, copies,
                         block_copies, mallocs, use_name, use_weight);

    merge_sort_merge(list, low_index, m, m + 1, high_index, comparisons, copies,
                     block_copies, mallocs, use_name, use_weight);
  }
}
/* Implement merge sort. */
void merge_sort(monster *list, int n, int use_name, int use_weight) {
  int comparisons = 0;
  int copies = 0;
  int block_copies = 0;
  int mallocs = 0;
  clock_t start_cpu, end_cpu;
  printf("Merge sort %d monsters...\n", n);
  start_cpu = clock();
  merge_sort_recursive(list, 0, n - 1, &comparisons, &copies, &block_copies,
                       &mallocs, use_name, use_weight);
  end_cpu = clock();
  printf("Sort complete with %d comparisons, %d block copies, %d total copies, "
         "%d mallocs.\n",
         comparisons, block_copies, copies, mallocs);
  print_clocks(end_cpu - start_cpu);
}

/* Recursive function for merge-insertion sort. */
void merge_insertion_sort_recursive(monster *list, int low_index,
                                    int high_index, int *comparisons,
                                    int *copies, int *block_copies,
                                    int *mallocs, int use_name,
                                    int use_weight) {
  int n = high_index + 1;
  if (n <= 25) {
    insertion_sort_internal(list, n, comparisons, copies, block_copies,
                            use_name, use_weight);
  } else {
    int mid = (low_index + high_index) / 2;
    merge_sort_recursive(list, low_index, mid, comparisons, copies,
                         block_copies, mallocs, use_name, use_weight);

    merge_sort_recursive(list, mid + 1, high_index, comparisons, copies,
                         block_copies, mallocs, use_name, use_weight);

    merge_sort_merge(list, low_index, mid, mid + 1, high_index, comparisons,
                     copies, block_copies, mallocs, use_name, use_weight);
  }
}

/* Implement merge sort. */
void merge_insertion_sort(monster *list, int n, int use_name, int use_weight) {
  int comparisons = 0;
  int copies = 0;
  int block_copies = 0;
  int mallocs = 0;
  clock_t start_cpu, end_cpu;
  printf("Merge-insertion sort %d monsters...\n", n);
  start_cpu = clock();
  merge_insertion_sort_recursive(list, 0, n - 1, &comparisons, &copies,
                                 &block_copies, &mallocs, use_name, use_weight);
  end_cpu = clock();
  printf("Sort complete with %d comparisons, %d block copies, %d total copies, "
         "%d mallocs.\n",
         comparisons, block_copies, copies, mallocs);
  print_clocks(end_cpu - start_cpu);
}
/* Main program. */
void run_all_sorts(int n, int only_fast, int use_name, int use_weight) {
  monster *our_list = make_some_monsters(n);
  monster *our_unsorted_list = malloc(sizeof(monster) * n);
  printf("SORT SET: n = %d, %s, by %s\n\n", n,
         only_fast ? "fast sorts only" : "all sorts",
         use_name ? "name" : "weight");
  if (only_fast == 0) {
    memcpy(our_unsorted_list, our_list, sizeof(monster) * n);
    bubble_sort(our_unsorted_list, n, use_name, use_weight);
    check_monster_sort(our_unsorted_list, n, use_name, use_weight);
    memcpy(our_unsorted_list, our_list, sizeof(monster) * n);
    selection_sort(our_unsorted_list, n, use_name, use_weight);
    check_monster_sort(our_unsorted_list, n, use_name, use_weight);
    memcpy(our_unsorted_list, our_list, sizeof(monster) * n);
    insertion_sort(our_unsorted_list, n, use_name, use_weight);
    check_monster_sort(our_unsorted_list, n, use_name, use_weight);
  }
  memcpy(our_unsorted_list, our_list, sizeof(monster) * n);
  quick_sort(our_unsorted_list, n, use_name, use_weight);
  check_monster_sort(our_unsorted_list, n, use_name, use_weight);
  memcpy(our_unsorted_list, our_list, sizeof(monster) * n);
  merge_sort(our_unsorted_list, n, use_name, use_weight);
  check_monster_sort(our_unsorted_list, n, use_name, use_weight);
  memcpy(our_unsorted_list, our_list, sizeof(monster) * n);
  merge_insertion_sort(our_unsorted_list, n, use_name, use_weight);
  check_monster_sort(our_unsorted_list, n, use_name, use_weight);
  printf("SORT SET COMPLETE\n\n");
  free(our_list);
  free(our_unsorted_list);
}

int main(void) {
  run_all_sorts(50, 0, 0, 1);
  run_all_sorts(50, 0, 1, 0);
  run_all_sorts(500, 0, 0, 1);
  run_all_sorts(500, 0, 1, 0);
  run_all_sorts(5000, 0, 0, 1);
  run_all_sorts(5000, 0, 1, 0);
  run_all_sorts(50000, 1, 0, 1);
  run_all_sorts(50000, 1, 1, 0);
  run_all_sorts(500000, 1, 0, 1);
  run_all_sorts(500000, 1, 1, 0);
}