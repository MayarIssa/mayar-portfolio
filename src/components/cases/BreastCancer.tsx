import { Reveal } from "../Reveal";
import { Bars } from "./Bars";
import { Block, Figure, Stat } from "./ui";

const pipeline = [
  ["Explore", "570 patient records with 30 measurements of each cell nucleus: radius, texture, perimeter, area, concavity and more."],
  ["Map what's missing", "Heatmaps showed the gaps were missing completely at random, so filling them wouldn't bias the data."],
  ["Fill the gaps", "Mean, median and most-frequent imputation were each scored with a Random Forest. Mean imputation won."],
  ["Tame outliers", "Found with the IQR rule, then capped rather than dropped, so no patient was thrown away."],
  ["Check the shape", "Skewness, kurtosis and Shapiro–Wilk tests showed many features aren't normal, which favours tree-based models."],
  ["Model and explain", "Logistic Regression as the baseline, Random Forest as the winner, then a Power BI dashboard for non-technical readers."],
];

export function BreastCancer() {
  return (
    <>
      <Reveal className="mt-14 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat value="95.6%" label="Random Forest accuracy" />
        <Stat value="94.7%" label="Logistic Regression baseline" />
        <Stat value="570" label="patient records" />
        <Stat value="30" label="features per tumour" />
      </Reveal>

      <Block label="/problem" title="Benign or malignant? And can a doctor who doesn't code read the answer?">
        <Reveal>
          <p className="max-w-3xl text-lg leading-relaxed text-muted">
            The Wisconsin Breast Cancer (Diagnostic) dataset describes tumour cells measured from biopsy images. Our goal was a model that tells benign from
            malignant reliably, with data cleaning we could defend, and a dashboard that explains the result without any Python.
          </p>
        </Reveal>
      </Block>

      <Block label="/pipeline" title="Six steps from raw data to a dashboard">
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pipeline.map(([title, detail], i) => (
            <Reveal as="li" key={title} delay={i * 0.06} className="rounded-2xl border border-line bg-panel p-5">
              <span className="font-mono text-sm" style={{ color: "var(--tint)" }}>0{i + 1}</span>
              <h3 className="mt-2 font-display text-lg font-bold">{title}</h3>
              <p className="mt-1.5 leading-relaxed text-muted">{detail}</p>
            </Reveal>
          ))}
        </ol>
        <div className="mt-6 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <Figure
            src="/work/breast-cancer/missing-heatmap.webp"
            alt="Heatmap of the dataset with missing values marked in yellow, scattered across every feature column"
            width={1004}
            height={673}
            caption="Before cleaning: every yellow mark is a missing value. They're scattered evenly across features, which is what 'missing completely at random' looks like."
          />
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-lg font-bold">Which way of filling gaps works best?</h3>
            <Bars
              min={90}
              max={96}
              caption="Random Forest accuracy after each imputation strategy. Axis starts at 90%."
              rows={[
                { label: "Mean", value: 94.74, best: true },
                { label: "Median", value: 93.86 },
                { label: "Most frequent", value: 92.98 },
              ]}
            />
          </div>
        </div>
      </Block>

      <Block label="/results" title="Random Forest wins, and it's better at catching malignant tumours">
        <div className="grid gap-5 lg:grid-cols-[1fr_1.5fr]">
          <div className="flex flex-col gap-5">
            <Bars
              min={90}
              max={96}
              caption="Test-set accuracy on the cleaned, outlier-capped data. Axis starts at 90%."
              rows={[
                { label: "Random Forest", value: 95.61, best: true },
                { label: "Logistic Regression", value: 94.74 },
              ]}
            />
            <Figure
              src="/work/breast-cancer/confusion.webp"
              alt="Two confusion matrices: Logistic Regression on top and Random Forest below"
              width={404}
              height={730}
              white
              caption="Confusion matrices for both models. In diagnosis, a missed malignant tumour costs the most, so we compared F1 on that class too."
            />
          </div>
          <div className="flex flex-col gap-5">
            <Figure
              src="/work/breast-cancer/importance.webp"
              alt="Bar chart of Random Forest feature importance, led by concave points mean, concave points worst and area worst"
              width={927}
              height={506}
              white
              caption="What the model looks at: concave points and tumour area matter most."
            />
            <Figure
              src="/work/breast-cancer/scatter.webp"
              alt="Scatter plot of perimeter mean against perimeter worst, with malignant tumours clustered at larger perimeters"
              width={663}
              height={473}
              white
              caption="Malignant tumours (dark) separate clearly from benign ones (light) as perimeter grows."
            />
          </div>
        </div>
      </Block>

      <Block label="/dashboard" title="A Power BI dashboard for people who'll never open a notebook">
        <div className="grid gap-5 md:grid-cols-2">
          <Figure
            src="/work/breast-cancer/pbi-area.webp"
            alt="Power BI stacked bar chart counting tumours by area range, split by benign and malignant"
            width={526}
            height={484}
            white
            caption="Tumours grouped by size: almost every 'very large' tumour is malignant, while small ones are mostly benign."
          />
          <Figure
            src="/work/breast-cancer/pbi-correlation.webp"
            alt="Power BI table of the features most correlated with diagnosis: concave points mean 0.73, area mean 0.71, perimeter mean 0.71"
            width={640}
            height={378}
            white
            caption="The five features most correlated with the diagnosis, ready for a non-technical reader."
          />
        </div>
      </Block>
    </>
  );
}
