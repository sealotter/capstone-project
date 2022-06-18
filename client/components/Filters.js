import React, {useEffect, useRef} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import {Button, InputLabel, MenuItem, FormControl, Select, Chip, TextField} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button:{
    display:'flex',
    alignItems:'center'
  }, 
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, genre, theme) {
  return {
    fontWeight:
      genre.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function MultipleSelect(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [genre, setGenre] = React.useState([]);
  const {genres, media, nameSearch, peopleSearch} = props
  const prevMedia = usePrevious(media)
  const prevNameSearch = usePrevious(nameSearch)
  const prevPeopleSearch = usePrevious(peopleSearch)
  const selectedGenres = genres

  useEffect(() => {
    if(prevMedia !== media || prevNameSearch !== nameSearch || prevPeopleSearch !== peopleSearch){
      props.setNewGenres()
      setGenre([])
    }
  })

  const handleChange = (event) => {
    setGenre(event.target.value);
    props.onChangeValue(event.target.value)
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">Genres</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={genre}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value.id} label={value.name} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {selectedGenres?.map((item) => (
            <MenuItem key={item.id} value={item} style={getStyles(item.name, genre, theme)}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button className={classes.button} onClick={()=>{setGenre([]), props.setNewGenres()}}>Reset</Button>
    </div>
  );
}

export function BasicSelects(props) {
  const {media} = props
  const classes = useStyles();
  const [state, setState] = React.useState({
    media: 'movie',
  });

  const handleChange = (event) => {
    const {name} = event.target;
    setState({
      ...state,
      [name]: event.target.value,
    });
    props.onChangeValue(event.target.value)
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel>Media</InputLabel>
        <Select
          native
          value={state.media}
          onChange={handleChange}
          inputProps={{
            name: 'media',
          }}
        >
          {Object.entries(media).map(([key, val], idx)=>{
            return <option key={idx} value={key}>{val}</option>})}
        </Select>
      </FormControl>
    </div>
  );
}

export function SearchBox(props) {
  const classes = useStyles();
  const {genres, onChangeValue, searchBy, nameSearch, peopleSearch, media} = props
  const prevGenres = usePrevious(genres)
  const prevNameSearch = usePrevious(nameSearch)
  const prevPeopleSearch = usePrevious(peopleSearch)
  const prevMedia = usePrevious(media)
  const [name, setName] = React.useState('');
  const [people, setPeople] = React.useState('');

  useEffect(() => {
    if(searchBy ==='title' && (prevGenres?.length !== genres?.length || prevPeopleSearch !== peopleSearch)){
      onChangeValue('')
      setName('')
    }
    if(searchBy ==='people' && (prevGenres?.length !== genres?.length || prevNameSearch !== nameSearch)){
      onChangeValue('')
      setPeople('')
    }
  })

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="standard-basic" value={searchBy==='title'?name:people} label={`Search by ${searchBy}`}
        onChange={(ev)=> {
          searchBy === 'title'?setName(ev.target.value):setPeople(ev.target.value)
          onChangeValue(ev.target.value)
        }}/>
      <Button className={classes.button} onClick={()=>{searchBy==='title'?setName(''):setPeople(''), onChangeValue('')}}>Reset</Button>
    </form>
  );
}