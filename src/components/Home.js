import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

const Home = (props) => {
  const { count } = props;

  const [text, setText] = useState(TEMP_TEXT);
  const [ques, setQues] = useState("");
  const [ans, setAns] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // When done, show message
    window.ipcRenderer &&
      window.ipcRenderer.on("qna:done", (answers) => {
        let tempAns = answers
          .map((answer) => answer.text + " (score =" + answer.score + ")")
          .join("\n\n");
        setAns(tempAns);

        console.log(answers);
      });
  }, []);

  // On top layout
  const doAnalyze = async (event) => {
    console.log("------ Analysing ...");
    setLoading(true);

    try {
      window.ipcRenderer &&
        window.ipcRenderer.send("qna:ans", {
          ques,
          text,
        });
    } catch (err) {
      console.log("err: ", err.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <div>Counter: {count}</div>
      <button
        onClick={() => {
          this.props.setCount(1 + count);
        }}
      >
        Increase Count
      </button>

      <button
        onClick={() => {
          this.props.history.push("/lol");
        }}
      >
        Go to "/lol"
      </button>

      <div
        className="App"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <div>Context (you can paste your own content in the text area)</div>
          <div style={{ color: "red" }}>{text.length} chars</div>
          <textarea
            rows="30"
            cols="50"
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
            // style={{ height: "100%" }}
          ></textarea>
        </div>
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <textarea
            rows="5"
            cols="100"
            value={ques}
            onChange={(e) => {
              setQues(e.target.value);
            }}
          />
          <button
            onClick={doAnalyze}
            style={{ height: "50px", width: "100px" }}
          >
            Ask
          </button>
          {loading && <div>Analysing...</div>}
          <textarea rows="5" cols="100" value={ans} readOnly />
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    count: state.route.count,
  };
};

export default connect(mapStateToProps, actions)(Home);

const TEMP_TEXT =
  "Nikola Tesla (/ˈtɛslə/;[2] Serbo-Croatian: [nǐkola têsla]; Serbian Cyrillic: Никола Тесла;[a] 10 July 1856 – 7 January 1943) was a Serbian-American[4][5][6] inventor, electrical engineer, mechanical engineer, and futurist who is best known for his contributions to the design of the modern alternating current (AC) electricity supply system.[7] Born and raised in the Austrian Empire, Tesla studied engineering and physics in the 1870s without receiving a degree, and gained practical experience in the early 1880s working in telephony and at Continental Edison in the new electric power industry. He emigrated in 1884 to the United States, where he would become a naturalized citizen. He worked for a short time at the Edison Machine Works in New York City before he struck out on his own. With the help of partners to finance and market his ideas, Tesla set up laboratories and companies in New York to develop a range of electrical and mechanical devices. His alternating current (AC) induction motor and related polyphase AC patents, licensed by Westinghouse Electric in 1888, earned him a considerable amount of money and became the cornerstone of the polyphase system which that company would eventually market. Attempting to develop inventions he could patent and market, Tesla conducted a range of experiments with mechanical oscillators/generators, electrical discharge tubes, and early X-ray imaging. He also built a wireless-controlled boat, one of the first ever exhibited. Tesla becamewell known as an inventor and would demonstrate his achievements to celebrities and wealthy patrons at his lab, and was noted for his showmanship at public lectures. Throughout the 1890s, Tesla pursued his ideas for wireless lighting and worldwide wireless electric power distribution in his high-voltage, high-frequency power experiments in New York and Colorado Springs. In 1893, he made pronouncements on the possibility of wireless communication with his devices. Tesla tried to put these ideas to practical use in his unfinished Wardenclyffe Tower project, an intercontinental wireless communication and power transmitter, but ran out of funding before he could complete it.[8] After Wardenclyffe, Tesla experimented with a series of inventions in the 1910s and 1920s with varying degrees of success. Having spent most of his money, Tesla lived in a series of New York hotels, leaving behind unpaid bills. He died in New York City in January 1943.[9] Tesla's work fell into relative obscurity following his death, until 1960, when the General Conference on Weights and Measures named the SI unit of magnetic flux density the tesla in his honor.[10] There has been a resurgence inpopular interest in Tesla since the 1990s.[11]";
