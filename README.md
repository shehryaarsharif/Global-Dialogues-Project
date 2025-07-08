# Global Dialogues Project

A comprehensive analysis and visualization of global perspectives on AI, featuring interactive data visualizations and real insights from thousands of participants worldwide.

## 📁 Project Structure

```
Global-Dialogues-Project/
├── data/                    # Raw datasets & processed data
│   ├── [GDC Dataset 1] Global Dialogue Cadence 1 Results.xlsx
│   ├── [GDC Dataset 2] Personalized AI Dialogue Results.xlsx
│   ├── viz_data.json       # Processed data for web app
│   └── extract_data.py     # Data processing scripts
├── analysis/                # Analysis & research
│   ├── globaldialogues.ipynb
│   ├── dataset_summary.md
│   ├── bertopic_topic_summary.txt
│   ├── analyze_datasets.py
│   ├── urban_responses.txt
│   ├── rural_responses.txt
│   ├── suburban_responses.txt
│   └── q6_unknown_region.csv
├── web-app/                 # React visualization app
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── docs/                    # Documentation
│   └── preview.txt
└── README.md
```

## 🚀 Quick Start

### Running the Web Application

1. **Navigate to the web app directory:**
   ```bash
   cd web-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser** and go to `http://localhost:3000`

### Data Processing

1. **Process the datasets:**
   ```bash
   cd data
   python extract_data.py
   ```

2. **View analysis results:**
   ```bash
   cd analysis
   python analyze_datasets.py
   ```

## 📊 Features

### Interactive Visualizations
- **Geographic Distribution** - Global response patterns
- **Demographic Analysis** - Age, education, location breakdowns
- **Sentiment Analysis** - Excitement vs concern about AI
- **Story Sections** - Real participant quotes with context

### Chart Types
- **Pie Charts** - Sentiment and demographic distributions
- **Bar Charts** - Geographic and categorical data
- **Line Charts** - Trends over time
- **Radar Charts** - Multi-dimensional analysis

### Technologies Used
- **React** with TypeScript
- **D3.js** for interactive visualizations
- **Framer Motion** for smooth animations
- **Tailwind CSS** for styling
- **Python** for data processing

## 📈 Data Sources

The project uses authentic data from the Global Dialogues Challenge:
- **Dataset 1**: Global Dialogue Cadence 1 Results (19MB)
- **Dataset 2**: Personalized AI Dialogue Results (19MB)

All visualizations are based on real responses from thousands of global participants.

## 🛠️ Development

### Prerequisites
- Node.js (v14 or higher)
- Python 3.8+
- npm or yarn

### Dependencies
- React 18
- D3.js
- Framer Motion
- Tailwind CSS
- pandas (Python)
- openpyxl (Python)

## 📝 Analysis Files

- `analysis/globaldialogues.ipynb` - Jupyter notebook with detailed analysis
- `analysis/dataset_summary.md` - Comprehensive dataset overview
- `analysis/bertopic_topic_summary.txt` - Topic modeling results
- `data/extract_data.py` - Data processing and extraction scripts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is part of the Global Dialogues Challenge research initiative.

---

**Note**: All data visualizations represent real responses from global participants in the AI dialogue surveys. The insights and quotes are authentic and reflect genuine perspectives on AI development. 