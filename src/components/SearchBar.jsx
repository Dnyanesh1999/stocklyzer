import { Box, TextField, CircularProgress, Autocomplete } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchStocks, clearResults } from "../redux/slices/searchSlice";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { results, loading } = useSelector((state) => state.search);

  useEffect(() => {
    if (input.length > 1) {
      dispatch(searchStocks(input));
    } else {
      dispatch(clearResults());
    }
  }, [input, dispatch]);

  const handleSelect = (event, value) => {
    if (value?.symbol) {
      navigate(`/stock/${value.symbol}`);
    }
  };

  return (
    <Box mt={4} mb={6} mx="auto" sx={{ maxWidth: 600 }}>
      <Autocomplete
        freeSolo
        options={results}
        getOptionLabel={(option) => `${option.symbol} - ${option.description}`}
        loading={loading}
        onInputChange={(e, value) => setInput(value)}
        onChange={handleSelect}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search stocks (e.g., INFY, TCS)"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </Box>
  );
};

export default SearchBar;
