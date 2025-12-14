import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Target,
  AlertTriangle,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  FileText,
  Settings,
  RefreshCw,
  Zap,
  Database,
  GitBranch,
  Play,
} from "lucide-react";

// Sample SWOT data for Tesla
const sampleSwotData = {
  company: "Tesla",
  score: 8.2,
  revisionCount: 1,
  reportLength: 2847,
  strengths: [
    "Market leader in electric vehicles with strong brand recognition",
    "Vertically integrated supply chain and in-house battery production",
    "Advanced autonomous driving technology and continuous OTA updates",
    "Supercharger network providing competitive advantage",
  ],
  weaknesses: [
    "Production quality inconsistencies and service center capacity",
    "Heavy reliance on CEO public persona and social media presence",
    "Limited model variety compared to traditional automakers",
    "High vehicle prices limiting mass-market accessibility",
  ],
  opportunities: [
    "Expanding global EV market and government incentives",
    "Energy storage and solar business growth potential",
    "Autonomous ride-sharing and robotaxi services",
    "New market entry in developing economies",
  ],
  threats: [
    "Increasing competition from legacy automakers and new EV startups",
    "Supply chain disruptions and raw material cost volatility",
    "Regulatory changes and subsidy reductions",
    "Economic downturns affecting luxury vehicle sales",
  ],
  critique:
    "The analysis provides comprehensive coverage of Tesla's strategic position. Strengths and opportunities are well-articulated with specific examples. Recommend adding more quantitative data points for market share and financial metrics. Overall quality meets professional standards.",
};

const loadingSteps = [
  { label: "Initializing research agent", icon: Database },
  { label: "Gathering company data", icon: FileText },
  { label: "Analyzing market position", icon: BarChart3 },
  { label: "Generating SWOT draft", icon: Brain },
  { label: "Evaluating quality", icon: Target },
  { label: "Refining analysis", icon: RefreshCw },
];

export default function Index() {
  const [company, setCompany] = useState("Tesla");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState("analysis");

  const handleGenerate = async () => {
    setIsLoading(true);
    setShowResults(false);
    setCurrentStep(0);

    // Simulate loading steps
    for (let i = 0; i < loadingSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setCurrentStep(i + 1);
    }

    await new Promise((resolve) => setTimeout(resolve, 400));
    setIsLoading(false);
    setShowResults(true);
  };

  const getScoreColor = (score: number) => {
    if (score >= 7) return "text-success";
    if (score >= 5) return "text-warning";
    return "text-destructive";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 7)
      return { label: "High Quality", variant: "default" as const, icon: CheckCircle };
    if (score >= 5)
      return { label: "Acceptable", variant: "secondary" as const, icon: AlertCircle };
    return { label: "Needs Improvement", variant: "destructive" as const, icon: XCircle };
  };

  const scoreBadge = getScoreBadge(sampleSwotData.score);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Brain className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">
                  A2A Strategy Agent
                </h1>
                <p className="text-sm text-muted-foreground">
                  Strategic SWOT Analysis with Self-Correcting AI
                </p>
              </div>
            </div>
            <Badge variant="outline" className="gap-1.5">
              <Zap className="h-3 w-3" />
              Agentic Automation Demo
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Input Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Settings className="h-4 w-4" />
                  Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Company Name
                  </label>
                  <Input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Enter company name"
                    disabled={isLoading}
                  />
                </div>
                <Button
                  onClick={handleGenerate}
                  disabled={isLoading || !company.trim()}
                  className="w-full gap-2"
                >
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                  {isLoading ? "Processing..." : "Generate SWOT"}
                </Button>
              </CardContent>
            </Card>

            {/* Process Steps Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <GitBranch className="h-4 w-4" />
                  Agent Workflow
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {loadingSteps.map((step, index) => {
                    const Icon = step.icon;
                    const isComplete = currentStep > index;
                    const isCurrent = currentStep === index + 1 && isLoading;

                    return (
                      <div
                        key={index}
                        className={`flex items-center gap-3 text-sm transition-opacity ${
                          isComplete || isCurrent
                            ? "opacity-100"
                            : "opacity-40"
                        }`}
                      >
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full ${
                            isComplete
                              ? "bg-success text-success-foreground"
                              : isCurrent
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {isComplete ? (
                            <CheckCircle className="h-3.5 w-3.5" />
                          ) : isCurrent ? (
                            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Icon className="h-3.5 w-3.5" />
                          )}
                        </div>
                        <span
                          className={
                            isComplete || isCurrent
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }
                        >
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* About Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>
                  The system uses a multi-agent architecture with automatic
                  quality control:
                </p>
                <ol className="list-decimal list-inside space-y-1 pl-1">
                  <li>Researcher gathers data</li>
                  <li>Analyst creates SWOT draft</li>
                  <li>Critic evaluates quality (1-10)</li>
                  <li>Editor improves if score &lt; 7</li>
                </ol>
                <p className="pt-2">
                  Loop continues until quality ≥ 7 or max 3 revisions.
                </p>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="space-y-6">
            {!showResults && !isLoading && (
              <Card className="flex flex-col items-center justify-center py-16">
                <Brain className="h-16 w-16 text-muted-foreground/30 mb-4" />
                <h2 className="text-xl font-medium text-foreground mb-2">
                  Ready to Analyze
                </h2>
                <p className="text-muted-foreground text-center max-w-md">
                  Enter a company name and click "Generate SWOT" to see the
                  self-correcting AI agent in action.
                </p>
              </Card>
            )}

            {isLoading && (
              <Card className="flex flex-col items-center justify-center py-16 animate-fade-in">
                <RefreshCw className="h-12 w-12 text-primary animate-spin mb-4" />
                <h2 className="text-xl font-medium text-foreground mb-2">
                  Analyzing {company}
                </h2>
                <p className="text-muted-foreground">
                  {loadingSteps[currentStep - 1]?.label || "Initializing..."}
                </p>
                <Progress
                  value={(currentStep / loadingSteps.length) * 100}
                  className="w-64 mt-4"
                />
              </Card>
            )}

            {showResults && (
              <div className="space-y-6 animate-slide-up">
                {/* Results Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground">
                      {sampleSwotData.company} Analysis
                    </h2>
                    <p className="text-muted-foreground">
                      Strategic assessment completed
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        Quality Score
                      </p>
                      <p className={`text-2xl font-bold ${getScoreColor(sampleSwotData.score)}`}>
                        {sampleSwotData.score}/10
                      </p>
                    </div>
                    <Badge variant={scoreBadge.variant} className="gap-1.5">
                      <scoreBadge.icon className="h-3 w-3" />
                      {scoreBadge.label}
                    </Badge>
                  </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="analysis" className="gap-2">
                      <BarChart3 className="h-4 w-4" />
                      SWOT Analysis
                    </TabsTrigger>
                    <TabsTrigger value="quality" className="gap-2">
                      <Target className="h-4 w-4" />
                      Quality Evaluation
                    </TabsTrigger>
                    <TabsTrigger value="details" className="gap-2">
                      <FileText className="h-4 w-4" />
                      Process Details
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="analysis" className="mt-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      {/* Strengths */}
                      <Card className="border-l-4 border-l-strength">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 text-base text-strength">
                            <TrendingUp className="h-4 w-4" />
                            Strengths
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {sampleSwotData.strengths.map((item, i) => (
                              <li
                                key={i}
                                className="flex gap-2 text-sm text-foreground"
                              >
                                <CheckCircle className="h-4 w-4 text-strength shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Weaknesses */}
                      <Card className="border-l-4 border-l-weakness">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 text-base text-weakness">
                            <TrendingDown className="h-4 w-4" />
                            Weaknesses
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {sampleSwotData.weaknesses.map((item, i) => (
                              <li
                                key={i}
                                className="flex gap-2 text-sm text-foreground"
                              >
                                <XCircle className="h-4 w-4 text-weakness shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Opportunities */}
                      <Card className="border-l-4 border-l-opportunity">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 text-base text-opportunity">
                            <Target className="h-4 w-4" />
                            Opportunities
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {sampleSwotData.opportunities.map((item, i) => (
                              <li
                                key={i}
                                className="flex gap-2 text-sm text-foreground"
                              >
                                <Zap className="h-4 w-4 text-opportunity shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Threats */}
                      <Card className="border-l-4 border-l-threat">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 text-base text-threat">
                            <AlertTriangle className="h-4 w-4" />
                            Threats
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {sampleSwotData.threats.map((item, i) => (
                              <li
                                key={i}
                                className="flex gap-2 text-sm text-foreground"
                              >
                                <AlertCircle className="h-4 w-4 text-threat shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="quality" className="mt-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">
                            Quality Metrics
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-muted-foreground">
                                Overall Score
                              </span>
                              <span className={`font-medium ${getScoreColor(sampleSwotData.score)}`}>
                                {sampleSwotData.score}/10
                              </span>
                            </div>
                            <Progress
                              value={sampleSwotData.score * 10}
                              className="h-2"
                            />
                          </div>

                          <Separator />

                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 rounded-lg bg-muted/50">
                              <p className="text-2xl font-bold text-foreground">
                                {sampleSwotData.revisionCount}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Revisions Made
                              </p>
                            </div>
                            <div className="text-center p-4 rounded-lg bg-muted/50">
                              <p className="text-2xl font-bold text-foreground">
                                {sampleSwotData.reportLength.toLocaleString()}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Characters
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">
                            Critic Evaluation
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {sampleSwotData.critique}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="details" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Process Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-3">
                            <div className="flex justify-between py-2 border-b border-border">
                              <span className="text-muted-foreground">
                                Company
                              </span>
                              <span className="font-medium">
                                {sampleSwotData.company}
                              </span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-border">
                              <span className="text-muted-foreground">
                                Strategy Focus
                              </span>
                              <span className="font-medium">
                                Cost Leadership
                              </span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-border">
                              <span className="text-muted-foreground">
                                Report Length
                              </span>
                              <span className="font-medium">
                                {sampleSwotData.reportLength.toLocaleString()}{" "}
                                chars
                              </span>
                            </div>
                          </div>

                          <div className="p-4 rounded-lg bg-muted/50">
                            <h4 className="font-medium mb-3 flex items-center gap-2">
                              <RefreshCw className="h-4 w-4" />
                              Self-Correcting Process
                            </h4>
                            <ol className="text-sm text-muted-foreground space-y-2">
                              <li className="flex gap-2">
                                <span className="font-medium text-foreground">
                                  1.
                                </span>
                                Researcher gathers company data
                              </li>
                              <li className="flex gap-2">
                                <span className="font-medium text-foreground">
                                  2.
                                </span>
                                Analyst creates initial SWOT draft
                              </li>
                              <li className="flex gap-2">
                                <span className="font-medium text-foreground">
                                  3.
                                </span>
                                Critic evaluates quality (1-10 scale)
                              </li>
                              <li className="flex gap-2">
                                <span className="font-medium text-foreground">
                                  4.
                                </span>
                                If score &lt; 7, Editor improves draft
                              </li>
                              <li className="flex gap-2">
                                <span className="font-medium text-foreground">
                                  5.
                                </span>
                                Loop until quality ≥ 7 or max 3 revisions
                              </li>
                            </ol>
                          </div>
                        </div>

                        <Separator />

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <GitBranch className="h-4 w-4" />
                          <span>
                            Workflow: Researcher → Analyst → Critic → Editor
                            (loop)
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-auto">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                AI-powered strategic analysis
              </span>
              <span className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Automatic quality improvement
              </span>
              <span className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Data-driven insights
              </span>
            </div>
            <span>A2A Strategy Agent Demo</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
