import pandas as pd
import numpy as np

def analyze_dataset_1():
    print("=== DATASET 1: Global Dialogue Cadence 1 Results ===")
    
    # Read the opinion questions sheet
    df1 = pd.read_excel('[GDC Dataset 1] Global Dialogue Cadence 1 Results.xlsx', sheet_name='GD1_opinion_questions')
    
    print(f"Shape: {df1.shape}")
    print(f"Columns: {list(df1.columns)}")
    
    # Get unique questions
    unique_questions = df1[['Question ID', 'Question']].drop_duplicates()
    print(f"\nNumber of unique questions: {len(unique_questions)}")
    
    print("\nSample questions:")
    for i, row in unique_questions.head(5).iterrows():
        print(f"Q{i+1}: {row['Question'][:100]}...")
    
    # Sample responses
    print("\n=== SAMPLE RESPONSES ===")
    sample_responses = df1[['Question', 'English Response', 'Submitted By']].head(3)
    for i, row in sample_responses.iterrows():
        print(f"\nQuestion: {row['Question'][:50]}...")
        print(f"Response: {row['English Response'][:100]}...")
        print(f"Submitted By: {row['Submitted By']}")
    
    # Demographics summary
    print("\n=== DEMOGRAPHICS SUMMARY ===")
    print(f"Total participants: {df1['All(1253)'].sum()}")
    print(f"Age groups: {df1['O2: 18-25 (430)'].sum()}, {df1['O2: 26-35 (512)'].sum()}, {df1['O2: 36-45 (191)'].sum()}")
    print(f"Gender: Male {df1['O3: Male (609)'].sum()}, Female {df1['O3: Female (630)'].sum()}")
    print(f"Area types: Rural {df1['O4: Rural (95)'].sum()}, Suburban {df1['O4: Suburban (338)'].sum()}, Urban {df1['O4: Urban (820)'].sum()}")

def analyze_dataset_2():
    print("\n\n=== DATASET 2: Personalized AI Dialogue Results ===")
    
    # Read the opinion questions sheet
    df2 = pd.read_excel('[GDC Dataset 2] Personalized AI Dialogue Results.xlsx', sheet_name='MD1_opinion_questions')
    
    print(f"Shape: {df2.shape}")
    print(f"Columns: {list(df2.columns)}")
    
    # Get unique questions
    unique_questions = df2[['Question ID', 'Question']].drop_duplicates()
    print(f"\nNumber of unique questions: {len(unique_questions)}")
    
    print("\nSample questions:")
    for i, row in unique_questions.head(5).iterrows():
        print(f"Q{i+1}: {row['Question'][:100]}...")
    
    # Sample responses
    print("\n=== SAMPLE RESPONSES ===")
    sample_responses = df2[['Question', 'English Responses', 'Submitted By']].head(3)
    for i, row in sample_responses.iterrows():
        print(f"\nQuestion: {row['Question'][:50]}...")
        print(f"Response: {row['English Responses'][:100]}...")
        print(f"Submitted By: {row['Submitted By']}")
    
    # Demographics summary
    print("\n=== DEMOGRAPHICS SUMMARY ===")
    print(f"Total participants: {df2['All(1071)'].sum()}")
    print(f"Age groups: {df2['O2: 18-25 (320)'].sum()}, {df2['O2: 26-35 (458)'].sum()}, {df2['O2: 36-45 (180)'].sum()}")
    print(f"Gender: Male {df2['O3: Male (518)'].sum()}, Female {df2['O3: Female (538)'].sum()}")
    print(f"Area types: Rural {df2['O4: Rural (74)'].sum()}, Suburban {df2['O4: Suburban (281)'].sum()}, Urban {df2['O4: Urban (716)'].sum()}")

def compare_datasets():
    print("\n\n=== DATASET COMPARISON ===")
    
    df1 = pd.read_excel('[GDC Dataset 1] Global Dialogue Cadence 1 Results.xlsx', sheet_name='GD1_opinion_questions')
    df2 = pd.read_excel('[GDC Dataset 2] Personalized AI Dialogue Results.xlsx', sheet_name='MD1_opinion_questions')
    
    print(f"Dataset 1 size: {df1.shape}")
    print(f"Dataset 2 size: {df2.shape}")
    
    # Compare unique questions
    unique_q1 = df1[['Question ID', 'Question']].drop_duplicates()
    unique_q2 = df2[['Question ID', 'Question']].drop_duplicates()
    
    print(f"\nUnique questions in Dataset 1: {len(unique_q1)}")
    print(f"Unique questions in Dataset 2: {len(unique_q2)}")
    
    print("\nDataset 1 Questions:")
    for i, row in unique_q1.iterrows():
        print(f"  {i+1}. {row['Question'][:80]}...")
    
    print("\nDataset 2 Questions:")
    for i, row in unique_q2.iterrows():
        print(f"  {i+1}. {row['Question'][:80]}...")

if __name__ == "__main__":
    analyze_dataset_1()
    analyze_dataset_2()
    compare_datasets() 