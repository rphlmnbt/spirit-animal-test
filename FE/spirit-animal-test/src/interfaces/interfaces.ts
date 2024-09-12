export interface IQuestionProps {
    setResult: (value: string) => void;
    setProbabilities: (value: number[]) => void;
    setShowResults: (value: boolean) => void;
}

export interface IResultsProps {
    result: string
    probabilities: number[];
    showResults: boolean;
}