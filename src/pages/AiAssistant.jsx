import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Fade,
} from "@mui/material";
import { askStocklyzerAi } from "../utils/askAi";
import ReactMarkdown from "react-markdown";

const AiAssistant = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");
    setShowAnswer(false);

    const response = await askStocklyzerAi(question);
    setAnswer(response);
    setLoading(false);
    setShowAnswer(true);
  };

  return (
    <Box mt={6} mx="auto" maxWidth="md">
      <Typography variant="h5" fontWeight={700} gutterBottom>
        🤖 Ask Stocklyzer AI
      </Typography>

      <Paper
        sx={{
          p: 3,
          border: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.paper",
          borderRadius: 2,
        }}
        elevation={2}
      >
        <TextField
          fullWidth
          label="Ask a stock-related question"
          placeholder="e.g., Should I invest in Reliance now?"
          variant="outlined"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          multiline
          minRows={2}
        />
        <Button
          variant="contained"
          sx={{ mt: 2, fontWeight: 600 }}
          onClick={handleAsk}
          disabled={loading}
        >
          {loading ? <CircularProgress size={22} /> : "Ask"}
        </Button>

        {/* Thinking indicator */}
        {loading && (
          <Typography
            variant="body2"
            sx={{ mt: 1.5, fontStyle: "italic", color: "text.secondary" }}
          >
            Thinking... please wait 🤔
          </Typography>
        )}
      </Paper>

      <Fade in={showAnswer} timeout={600}>
        <Box>
          {answer && (
            <Paper
              sx={{
                mt: 3,
                p: 3,
                border: "1px solid",
                borderColor: "divider",
                backgroundColor: "background.paper",

                borderRadius: 2,
              }}
              elevation={1}
            >
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                AI Response:
              </Typography>

              <Box sx={{ fontSize: "16px", lineHeight: 1.7 }}>
                <ReactMarkdown
                  components={{
                    p: ({ ...props }) => (
                      <Typography variant="body1" paragraph {...props} />
                    ),
                    strong: ({ ...props }) => (
                      <strong style={{ color: "#7187f1" }} {...props} />
                    ),
                    ul: ({ ...props }) => (
                      <ul
                        style={{ paddingLeft: 20, marginBottom: 8 }}
                        {...props}
                      />
                    ),
                    li: ({ ...props }) => (
                      <li style={{ marginBottom: 4 }} {...props} />
                    ),
                  }}
                >
                  {answer}
                </ReactMarkdown>
              </Box>
            </Paper>
          )}
        </Box>
      </Fade>
    </Box>
  );
};

export default AiAssistant;
