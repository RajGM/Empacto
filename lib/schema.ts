export interface KeyTopic {
    topicTitle: string;
    description: string;
  }
  
  export interface ActionStep {
    stepTitle: string;
    instructions: string;
  }
  
  export interface TrainingOutline {
    /**
     * Introduction to the sustainability training.
     */
    introduction: string;
  
    /**
     * A list of key sustainability topics.
     */
    keyTopics: KeyTopic[];
  
    /**
     * Concrete steps or tasks to achieve sustainability goals.
     */
    actionSteps: ActionStep[];
  
    /**
     * Methods to measure progress and continuously improve.
     */
    measurementAndContinuousImprovement: string;
  
    /**
     * Final thoughts or summary of the sustainability outline.
     */
    conclusion: string;
  }
  