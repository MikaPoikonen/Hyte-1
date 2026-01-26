erDiagram
  USERS ||--o{ DIARYENTRIES : has
  USERS ||--o{ DIETPLANS : has
  USERS ||--o{ DAILYHEALTHSTATS : logs

  USERS {
    int user_id PK
    varchar username
    varchar password
    varchar email
    datetime created_at
    varchar user_level
  }

  DIARYENTRIES {
    int entry_id PK
    int user_id FK
    date entry_date
    varchar mood
    decimal weight
    int sleep_hours
    text notes
    datetime created_at
  }

  DIETPLANS {
    int diet_id PK
    int user_id FK
    int target_calories
    decimal target_weight
    date diet_started
    date diet_ends
    int days_in_diet
    datetime created_at
  }

  DAILYHEALTHSTATS {
    int stat_id PK
    int user_id FK
    int calories_eaten
    int calories_used
    int steps
    decimal weight_today
    datetime created_at
  }
