import React, { useState } from 'react';
import { AlertTriangle, Building2, Clock, FileText, Users } from 'lucide-react';

type Scenario = {
  situation: string;
  time: string;
  location: string;
  participants: string;
  instructions: string[];
};

function App() {
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [loading, setLoading] = useState(false);

  const situations = [
    '地震発生時',
    '火災発生時',
    '津波警報発令時',
    '不審者侵入時',
    '台風接近時'
  ];

  const times = [
    '平日の午前中',
    '昼休み時間',
    '夕方の帰宅時間',
    '夜間',
    '休日'
  ];

  const locations = [
    'オフィスビル',
    '学校',
    '商業施設',
    '工場',
    '病院'
  ];

  const generateScenario = () => {
    setLoading(true);
    
    const randomSituation = situations[Math.floor(Math.random() * situations.length)];
    const randomTime = times[Math.floor(Math.random() * times.length)];
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    
    const newScenario: Scenario = {
      situation: randomSituation,
      time: randomTime,
      location: randomLocation,
      participants: '全従業員・来訪者',
      instructions: generateInstructions(randomSituation, randomLocation)
    };

    setTimeout(() => {
      setScenario(newScenario);
      setLoading(false);
    }, 1000);
  };

  const generateInstructions = (situation: string, location: string): string[] => {
    const baseInstructions = [
      '避難放送の確認',
      '非常口の確認',
      '避難経路の確保',
      '参加者の安全確認',
      '避難場所への誘導',
      '人数確認の実施'
    ];

    if (situation === '地震発生時') {
      return [
        'シェイクアウト（姿勢を低く、頭を守る、動かない）の実施',
        '落下物への注意喚起',
        ...baseInstructions
      ];
    }

    if (situation === '火災発生時') {
      return [
        '初期消火の試み',
        '煙の確認と回避',
        '防火扉の確認',
        ...baseInstructions
      ];
    }

    return baseInstructions;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            避難訓練シナリオジェネレーター
          </h1>
          <p className="text-gray-600">
            様々な状況を想定した避難訓練シナリオを自動生成します
          </p>
        </div>

        <div className="mb-8">
          <button
            onClick={generateScenario}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-50"
          >
            {loading ? '生成中...' : 'シナリオを生成する'}
          </button>
        </div>

        {scenario && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              避難訓練シナリオ
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-700">想定状況</h3>
                  <p className="text-gray-600">{scenario.situation}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-700">発生時間</h3>
                  <p className="text-gray-600">{scenario.time}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Building2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-700">場所</h3>
                  <p className="text-gray-600">{scenario.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Users className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-700">参加者</h3>
                  <p className="text-gray-600">{scenario.participants}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FileText className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-700">手順</h3>
                  <ol className="list-decimal list-inside text-gray-600 space-y-2 mt-2">
                    {scenario.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;