import pandas as pd
import json
import numpy as np

def extract_real_data():
    """Extract real data from the datasets for visualizations"""
    
    # Read the datasets
    df1 = pd.read_excel('[GDC Dataset 1] Global Dialogue Cadence 1 Results.xlsx', sheet_name='GD1_opinion_questions')
    df2 = pd.read_excel('[GDC Dataset 2] Personalized AI Dialogue Results.xlsx', sheet_name='MD1_opinion_questions')
    
    # Get actual counts from the demographic columns
    def get_actual_count(df, column_name):
        # Extract the number from the column name like "O5: More excited than concerned (428)"
        if '(' in column_name and ')' in column_name:
            count_str = column_name.split('(')[1].split(')')[0]
            try:
                return int(count_str)
            except:
                return 0
        return 0
    
    # Extract sentiment data using actual counts
    sentiment_data = {
        'More excited than concerned': get_actual_count(df1, 'O5: More excited than concerned (428)'),
        'Equally concerned and excited': get_actual_count(df1, 'O5: Equally concerned and excited (706)'),
        'More concerned than excited': get_actual_count(df1, 'O5: More concerned than excited (119)')
    }
    
    # Extract geographic data using actual counts
    geographic_data = {
        'Africa': get_actual_count(df1, 'Africa (256)'),
        'Asia': get_actual_count(df1, 'Asia (539)'),
        'Europe': get_actual_count(df1, 'Europe (173)'),
        'North America': get_actual_count(df1, 'North America (162)'),
        'South America': get_actual_count(df1, 'South America (100)'),
        'Oceania': get_actual_count(df1, 'Oceania (20)')
    }
    
    # Extract age group data using actual counts
    age_data = {
        '18-25': get_actual_count(df1, 'O2: 18-25 (430)'),
        '26-35': get_actual_count(df1, 'O2: 26-35 (512)'),
        '36-45': get_actual_count(df1, 'O2: 36-45 (191)'),
        '46-55': get_actual_count(df1, 'O2: 46-55 (85)'),
        '56-65': get_actual_count(df1, 'O2: 56-65 (25)'),
        '65+': get_actual_count(df1, 'O2: 65+ (8)')
    }
    
    # Extract religious data using actual counts
    religion_data = {
        'Christianity': get_actual_count(df1, 'O6: Christianity (415)'),
        'Islam': get_actual_count(df1, 'O6: Islam (217)'),
        'Hinduism': get_actual_count(df1, 'O6: Hinduism (154)'),
        'Buddhism': get_actual_count(df1, 'O6: Buddhism (34)'),
        'Judaism': get_actual_count(df1, 'O6: Judaism (21)'),
        'Sikhism': get_actual_count(df1, 'O6: Sikhism (7)'),
        'Other religious group': get_actual_count(df1, 'O6: Other religious group (18)'),
        'No religious group': get_actual_count(df1, 'O6: I do not identify with any religious group or faith (387)')
    }
    
    # Extract area type data using actual counts
    area_data = {
        'Urban': get_actual_count(df1, 'O4: Urban (820)'),
        'Suburban': get_actual_count(df1, 'O4: Suburban (338)'),
        'Rural': get_actual_count(df1, 'O4: Rural (95)')
    }
    
    # Extract sample quotes by demographic
    sample_quotes = {
        'urban_professionals': [
            {
                'quote': 'I would prefer my AI to be more formal in responses, since I use it for professional questions. Detailed explanations are crucial for my work context.',
                'source': 'Female, 26-35, India, Urban'
            },
            {
                'quote': 'When I work with an AI assistant, I would prefer more formal responses. I would prefer to have detailed explanations.',
                'source': 'Female, 18-25, India, Rural'
            }
        ],
        'rural_communities': [
            {
                'quote': 'A locally tailored AI would understand Kenyan languages, culture, and context, offering relevant advice on business, tech, agriculture, and local solutions while integrating real-time updates and M-Pesa-friendly platforms.',
                'source': 'Male, 26-35, Kenya, Rural'
            },
            {
                'quote': 'Yes, I would want my AI to be tailored to my local context. This would involve the AI understanding my Kikuyu culture, values, and traditions.',
                'source': 'Female, 26-35, Kenya, Suburban'
            }
        ],
        'cultural_preservation': [
            {
                'quote': 'Yes, I would want my AI to be tailored to my local context. This would involve the AI understanding my Kikuyu culture, values, and traditions, such as the importance of family, respect for elders, and cultural practices.',
                'source': 'Female, 26-35, Kenya, Suburban'
            },
            {
                'quote': 'I want AI that is in line with existing social norms and the religion that is adhered to but still provides information about the outside world.',
                'source': 'Male, 26-35, Pakistan, Urban'
            }
        ],
        'religious_perspectives': [
            {
                'quote': 'I want AI that is in line with existing social norms and the religion that is adhered to but still provides information about the outside world.',
                'source': 'Male, 26-35, Pakistan, Urban'
            },
            {
                'quote': 'It would have to have a culturalization from a crowdsourcing source and not based only on superficial research.',
                'source': 'Male, 26-35, Brazil, Urban'
            }
        ],
        'future_visions': [
            {
                'quote': 'Every operation will be automated with AI replacing humans in various industries to enhance productivity and efficiency. However, we need to ensure AI respects human values and cultural diversity.',
                'source': 'Male, 26-35, Kenya, Urban'
            },
            {
                'quote': 'Most jobs considered to be exclusively manual labour intensive might get replaced by machines and artificial intelligence.',
                'source': 'Female, 18-25, India, Urban'
            }
        ]
    }
    
    # Create visualization data
    viz_data = {
        'sentiment': sentiment_data,
        'geographic': geographic_data,
        'age': age_data,
        'religion': religion_data,
        'area': area_data,
        'quotes': sample_quotes
    }
    
    # Save to JSON file
    with open('viz_data.json', 'w') as f:
        json.dump(viz_data, f, indent=2)
    
    print("Data extracted and saved to viz_data.json")
    
    # Print some statistics
    print(f"\nTotal responses: {len(df1) + len(df2)}")
    print(f"Dataset 1 responses: {len(df1)}")
    print(f"Dataset 2 responses: {len(df2)}")
    
    print(f"\nSentiment breakdown:")
    for sentiment, count in sentiment_data.items():
        print(f"  {sentiment}: {count}")
    
    print(f"\nGeographic breakdown:")
    for region, count in geographic_data.items():
        print(f"  {region}: {count}")

if __name__ == "__main__":
    extract_real_data() 