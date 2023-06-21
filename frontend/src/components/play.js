import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Socket, io } from "socket.io-client";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ENDPOINT = "http://localhost:5000";
var socket;

export default function Home() {
  const pw = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/68px-Chess_plt45.svg.png"
  const rw = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Chess_rlt45.svg/68px-Chess_rlt45.svg.png"
  const nw = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chess_nlt45.svg/800px-Chess_nlt45.svg.png"
  const bw = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chess_blt45.svg/800px-Chess_blt45.svg.png"
  const qw = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Chess_qlt45.svg/68px-Chess_qlt45.svg.png"
  const kw = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Chess_klt45.svg/68px-Chess_klt45.svg.png"
  const pb = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/68px-Chess_pdt45.svg.png"
  const rb = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/68px-Chess_rdt45.svg.png"
  const nb = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Chess_ndt45.svg/800px-Chess_ndt45.svg.png"
  const bb = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Chess_bdt45.svg/68px-Chess_bdt45.svg.png"
  const qb = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Chess_qdt45.svg/68px-Chess_qdt45.svg.png"
  const kb = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chess_kdt45.svg/68px-Chess_kdt45.svg.png"
  const suser = useRef('');
  const [searcheduser, setSearcheduser] = useState()
  const [isPlaying, setIsPlaying] = useState(false)
  const user = JSON.parse(localStorage.getItem("user"))
  const [newchallenger, setNewchallenger] = useState()
  const [modaltoggle, setModaltoggle] = useState(false)
  const [isreallyplaying, setIsreallyplaying] = useState(false)
  const [buttonStates, setButtonStates] = useState({
    a8: false,
    a7: false,
    a6: false,
    a5: false,
    a4: false,
    a3: false,
    a2: false,
    a1: false,
    b8: false,
    b7: false,
    b6: false,
    b5: false,
    b4: false,
    b3: false,
    b2: false,
    b1: false,
    c8: false,
    c7: false,
    c6: false,
    c5: false,
    c4: false,
    c3: false,
    c2: false,
    c1: false,
    d8: false,
    d7: false,
    d6: false,
    d5: false,
    d4: false,
    d3: false,
    d2: false,
    d1: false,
    e8: false,
    e7: false,
    e6: false,
    e5: false,
    e4: false,
    e3: false,
    e2: false,
    e1: false,
    f8: false,
    f7: false,
    f6: false,
    f5: false,
    f4: false,
    f3: false,
    f2: false,
    f1: false,
    g8: false,
    g7: false,
    g6: false,
    g5: false,
    g4: false,
    g3: false,
    g2: false,
    g1: false,
    h8: false,
    h7: false,
    h6: false,
    h5: false,
    h4: false,
    h3: false,
    h2: false,
    h1: false
  });
  const [moving, setMoving] = useState(false)
  const [availablemoves, setAvailablemoves] = useState([])
  const [piecetomove, setPiecetomove] = useState('')
  const [isboardfliped, setIsboardfliped] = useState(false)
  const [currentgameid, setCurrentgameid] = useState('')
  const [gamedata, setGamedata] = useState({
    black: {
      _id: "fl;askjdf",
      name: "al;sjkdf"
    },
    white: {
      _id: "fl;askjdf",
      name: "al;sjkdf"
    },
    whoToMove: "flahskdf;lasf",
    isOver: false
  })
  const toastconfig = {
    position: "bottom-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  }



  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) {
      window.location = "/login"
    }
  }, [])

  useEffect(() => {
    socket = io(ENDPOINT)
    socket.on("connected", () => {
      toast.success("You are now Connected!!!", toastconfig);
    })
    socket.on("disconnected", () => {
      toast.warn("No longer accepting challenges", toastconfig);
    })
    socket.on("new challenge", (data) => {
      if (data.yourid === user._id) {
        setNewchallenger(data)
        setModaltoggle(true)
        toast.success(`New challenge recieved from ${data.my.myname}`, toastconfig);
      }
    })
    socket.on("challenge rejected", (data) => {
      if (data.yourid === user._id) {
        toast.error(`Challenge rejected from ${data.my.myname}`, toastconfig);
      }
    })
    socket.on("challenge accepted", async (data) => {
      if (data.yourid === user._id) {
        toast.success(`Challenge accepted from ${data.my.myname}`, toastconfig);
        const random = Math.floor(Math.random() * 2);
        if (random === 0) {
          const data2 = {
            user1: user._id,
            user2: data.my.myid
          }
          const token = localStorage.getItem("token")
          var response = await axios.post(`/api/creategame`, data2, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        }
        else {
          const data2 = {
            user1: data.my.myid,
            user2: user._id
          }
          const token = localStorage.getItem("token")
          var response = await axios.post(`/api/creategame`, data2, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        }
        const data3 = {
          tobeplayed: data.my.myid,
          gameid: response.data.game._id
        }
        setCurrentgameid(response.data.game._id)
        fetchboard(response.data.game._id)
        socket.emit("personalroom", data3)
        setIsreallyplaying(true)
        socket.emit("join game", response.data.game._id)
      }
    })
    socket.on("personalroom", async (data) => {
      if (data.tobeplayed == user._id) {
        setCurrentgameid(data.gameid)
        fetchboard(data.gameid)
        socket.emit("setupclose")
        setIsreallyplaying(true)
        socket.emit("join game", data.gameid)
      }
    })
    socket.on("fetch", (room) => {
      fetchboard(room)
    })
  }, [])

  const initiatenewgame = () => {
    setSearcheduser([])
    setIsPlaying(false)
    socket.emit("setupclose")  
    setNewchallenger({})
    setModaltoggle(false)
    setIsreallyplaying(false)
    setMoving(false)
    setAvailablemoves([])
    setPiecetomove('')
    if(isboardfliped){
      flipboard()
      setIsboardfliped(false)
    }
    setCurrentgameid('')
    const squares = document.getElementsByClassName("square")
    Array.from(squares).forEach(element => {
      var childimg = element.querySelector('img');
      childimg.className = ""
      childimg.src = ""
      setButtonStates(prevState => {
        const updatedStates = { ...prevState };
        for (const buttonId in updatedStates) {
          updatedStates[buttonId] = false;
        }
        return updatedStates;
      });
    });
    const newgamebut = document.getElementById("newgamebut")
    newgamebut.hidden = false
  }

  const searchusers = async () => {
    const details = suser.current.value;
    const token = localStorage.getItem("token")
    const response = await axios.get(`/api/searchuser?search=${details}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setSearcheduser(response.data)
  }


  const acceptchallenge = () => {
    setModaltoggle(false)
    const data = {
      my: {
        myid: user._id,
        myname: user.name
      },
      yourid: newchallenger.my.myid
    }
    socket.emit("challenge accept", data)
    setIsreallyplaying(true)
  }


  const rejectchallenge = () => {
    setModaltoggle(false)
    const data = {
      my: {
        myid: user._id,
        myname: user.name
      },
      yourid: newchallenger.my.myid
    }
    socket.emit("challenge reject", data)
  }


  const togglePlaying = () => {
    if (!isPlaying) {
      socket.emit("setup")
    }
    if (isPlaying) {
      socket.emit("setupclose")
    }
    setIsPlaying(!isPlaying)
  }


  const flipboard = () => {
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
      var image = images[i];
      image.style.transform = 'rotate(180deg)';
    }
    const board = document.getElementById("board")
    board.classList.add("rotate-180");
  }


  const initiateGame = async (userid) => {
    const user = JSON.parse(localStorage.getItem("user"))
    let data = {
      my: {
        myid: user._id,
        myname: user.name
      },
      yourid: userid
    }
    socket.emit("challenge", (data))
  }


  const fetchboard = async (gid) => {
    const token = localStorage.getItem("token")
    const response = await axios.post('/api/fetchboard', {
      gameid: currentgameid == '' ? gid : currentgameid
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setGamedata(response.data)
    if (isboardfliped == false && response.data.black._id == user._id) {
      flipboard()
      setIsboardfliped(true)
    }
    const board = JSON.parse(response.data.board)
    const squares = document.getElementsByClassName("square")
    Array.from(squares).forEach(element => {
      var childimg = element.querySelector('img');
      childimg.className = ""
      childimg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAQAAADa613fAAAAaElEQVR42u3PQREAAAwCoNm/9CL496ABuREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREWkezG8AZQ6nfncAAAAASUVORK5CYII="
      setButtonStates(prevState => {
        const updatedStates = { ...prevState };
        for (const buttonId in updatedStates) {
          updatedStates[buttonId] = false;
        }
        return updatedStates;
      });
    });
    board.forEach(element => {
      element.forEach(element1 => {
        if (element1) {
          const square = element1.square;
          const piece = element1.type + element1.color
          var parent = document.getElementById(square);
          var child = parent.querySelector('img');
          child.src = eval(piece)
          if (response.data.isOver) {
            disableallpieces()
          }
          else {
            child.className = 'cursor-pointer'
          }
        }
      });
    });
    if (response.data.isOver) {
      if (response.data.wonBy._id == user._id) {
        socket.emit("leave game", currentgameid)
        toast.success(`${response.data.wonBy.name} won game by ${response.data.reasonForWin}`, toastconfig);
      }
      else {
        toast.error(`${response.data.wonBy.name} won game by ${response.data.reasonForWin}`, toastconfig);
      }
      const newgamebut = document.getElementById("newgamebut")
      newgamebut.hidden = false
    }
    if (response.data.whoToMove !== user._id) {
      disableallpieces()
    }
  }

  const disableallpieces = () => {
    const squares2 = document.getElementsByClassName("square")
    Array.from(squares2).forEach(element => {
      var childimg = element.querySelector('img');
      childimg.className = "cursor-not-allowed"
    });
    setButtonStates(prevState => {
      const updatedStates = { ...prevState };
      for (const buttonId in updatedStates) {
        updatedStates[buttonId] = true;
      }
      return updatedStates;
    });
  }


  const handlepiececlick = async (e) => {
    if (!moving) {
      setPiecetomove(e)
      const token = localStorage.getItem("token")
      const response = await axios.post('/api/getmoves', {
        gameid: currentgameid,
        square: e
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.data.moves.length > 0) {
        let tempavailablemovesarray = []
        response.data.moves.forEach(element => {
          if (element.length > 2) {
            if (element.slice(-1) == '+') {
              element = element.slice(0, -1)
            }
            if (element.slice(-1) == '#') {
              element = element.slice(0, -1)
            }
            element = element.slice(-2);
          }
          tempavailablemovesarray.push(element)
          const availablesquare = document.getElementById(element)
          availablesquare.style.border = availablesquare.style.border + "2px solid white"
        });
        setAvailablemoves(tempavailablemovesarray)
        setMoving(true)
      }
    }
    else {
      if (availablemoves.includes(e)) {
        handlepiecemove(piecetomove, e)
      }
      setAvailablemoves([])
      setMoving(false)
      setPiecetomove('')
      const elements = document.querySelectorAll('[style]');
      elements.forEach((element) => {
        element.style.border = "";
      });
    }
  }


  const handlepiecemove = async (ptm, wtm) => {
    const token = localStorage.getItem("token")
    const response = await axios.put('/api/move', {
      gameid: currentgameid,
      presquare: ptm,
      postsquare: wtm
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (response.data.success) {
      socket.emit("fetch", currentgameid)
      fetchboard(currentgameid)
    }
    else {
      toast.error(response.data.message, toastconfig)
    }
  }
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="w-full flex bg-gray-800">
        <div id="board" className="flex border w-min mx-10 border-white">
          <div>
            <div id='a8' className="bg-gray-800 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.a8} onClick={() => { handlepiececlick("a8") }}><img className="" src="" alt="" /></button></div>
            <div id='a7' className="bg-blue-500 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.a7} onClick={() => { handlepiececlick("a7") }}><img className="" src="" alt="" /></button></div>
            <div id='a6' className="bg-gray-800 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.a6} onClick={() => { handlepiececlick("a6") }}><img className="" src="" alt="" /></button></div>
            <div id='a5' className="bg-blue-500 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.a5} onClick={() => { handlepiececlick("a5") }}><img className="" src="" alt="" /></button></div>
            <div id='a4' className="bg-gray-800 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.a4} onClick={() => { handlepiececlick("a4") }}><img className="" src="" alt="" /></button></div>
            <div id='a3' className="bg-blue-500 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.a3} onClick={() => { handlepiececlick("a3") }}><img className="" src="" alt="" /></button></div>
            <div id='a2' className="bg-gray-800 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.a2} onClick={() => { handlepiececlick("a2") }}><img className="" src="" alt="" /></button></div>
            <div id='a1' className="bg-blue-500 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.a1} onClick={() => { handlepiececlick("a1") }}><img className="" src="" alt="" /></button></div>
          </div>
          <div>
            <div id='b8' className="bg-blue-500 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.b8} onClick={() => { handlepiececlick("b8") }}><img className="" src="" alt="" /></button></div>
            <div id='b7' className="bg-gray-800 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.b7} onClick={() => { handlepiececlick("b7") }}><img className="" src="" alt="" /></button></div>
            <div id='b6' className="bg-blue-500 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.b6} onClick={() => { handlepiececlick("b6") }}><img className="" src="" alt="" /></button></div>
            <div id='b5' className="bg-gray-800 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.b5} onClick={() => { handlepiececlick("b5") }}><img className="" src="" alt="" /></button></div>
            <div id='b4' className="bg-blue-500 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.b4} onClick={() => { handlepiececlick("b4") }}><img className="" src="" alt="" /></button></div>
            <div id='b3' className="bg-gray-800 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.b3} onClick={() => { handlepiececlick("b3") }}><img className="" src="" alt="" /></button></div>
            <div id='b2' className="bg-blue-500 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.b2} onClick={() => { handlepiececlick("b2") }}><img className="" src="" alt="" /></button></div>
            <div id='b1' className="bg-gray-800 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.b1} onClick={() => { handlepiececlick("b1") }}><img className="" src="" alt="" /></button></div>
          </div>
          <div>
            <div id='c8' className="bg-gray-800 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.c8} onClick={() => { handlepiececlick("c8") }}><img className="" src="" alt="" /></button></div>
            <div id='c7' className="bg-blue-500 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.c7} onClick={() => { handlepiececlick("c7") }}><img className="" src="" alt="" /></button></div>
            <div id='c6' className="bg-gray-800 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.c6} onClick={() => { handlepiececlick("c6") }}><img className="" src="" alt="" /></button></div>
            <div id='c5' className="bg-blue-500 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.c5} onClick={() => { handlepiececlick("c5") }}><img className="" src="" alt="" /></button></div>
            <div id='c4' className="bg-gray-800 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.c4} onClick={() => { handlepiececlick("c4") }}><img className="" src="" alt="" /></button></div>
            <div id='c3' className="bg-blue-500 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.c3} onClick={() => { handlepiececlick("c3") }}><img className="" src="" alt="" /></button></div>
            <div id='c2' className="bg-gray-800 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.c2} onClick={() => { handlepiececlick("c2") }}><img className="" src="" alt="" /></button></div>
            <div id='c1' className="bg-blue-500 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.c1} onClick={() => { handlepiececlick("c1") }}><img className="" src="" alt="" /></button></div>
          </div>
          <div>
            <div id='d8' className="bg-blue-500 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.d8} onClick={() => { handlepiececlick("d8") }}><img className="" src="" alt="" /></button></div>
            <div id='d7' className="bg-gray-800 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.d7} onClick={() => { handlepiececlick("d7") }}><img className="" src="" alt="" /></button></div>
            <div id='d6' className="bg-blue-500 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.d6} onClick={() => { handlepiececlick("d6") }}><img className="" src="" alt="" /></button></div>
            <div id='d5' className="bg-gray-800 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.d5} onClick={() => { handlepiececlick("d5") }}><img className="" src="" alt="" /></button></div>
            <div id='d4' className="bg-blue-500 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.d4} onClick={() => { handlepiececlick("d4") }}><img className="" src="" alt="" /></button></div>
            <div id='d3' className="bg-gray-800 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.d3} onClick={() => { handlepiececlick("d3") }}><img className="" src="" alt="" /></button></div>
            <div id='d2' className="bg-blue-500 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.d2} onClick={() => { handlepiececlick("d2") }}><img className="" src="" alt="" /></button></div>
            <div id='d1' className="bg-gray-800 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.d1} onClick={() => { handlepiececlick("d1") }}><img className="" src="" alt="" /></button></div>
          </div>
          <div>
            <div id='e8' className="bg-gray-800 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.e8} onClick={() => { handlepiececlick("e8") }}><img className="" src="" alt="" /></button></div>
            <div id='e7' className="bg-blue-500 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.e7} onClick={() => { handlepiececlick("e7") }}><img className="" src="" alt="" /></button></div>
            <div id='e6' className="bg-gray-800 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.e6} onClick={() => { handlepiececlick("e6") }}><img className="" src="" alt="" /></button></div>
            <div id='e5' className="bg-blue-500 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.e5} onClick={() => { handlepiececlick("e5") }}><img className="" src="" alt="" /></button></div>
            <div id='e4' className="bg-gray-800 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.e4} onClick={() => { handlepiececlick("e4") }}><img className="" src="" alt="" /></button></div>
            <div id='e3' className="bg-blue-500 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.e3} onClick={() => { handlepiececlick("e3") }}><img className="" src="" alt="" /></button></div>
            <div id='e2' className="bg-gray-800 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.e2} onClick={() => { handlepiececlick("e2") }}><img className="" src="" alt="" /></button></div>
            <div id='e1' className="bg-blue-500 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.e1} onClick={() => { handlepiececlick("e1") }}><img className="" src="" alt="" /></button></div>
          </div>
          <div>
            <div id='f8' className="bg-blue-500 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.f8} onClick={() => { handlepiececlick("f8") }}><img className="" src="" alt="" /></button></div>
            <div id='f7' className="bg-gray-800 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.f7} onClick={() => { handlepiececlick("f7") }}><img className="" src="" alt="" /></button></div>
            <div id='f6' className="bg-blue-500 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.f6} onClick={() => { handlepiececlick("f6") }}><img className="" src="" alt="" /></button></div>
            <div id='f5' className="bg-gray-800 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.f5} onClick={() => { handlepiececlick("f5") }}><img className="" src="" alt="" /></button></div>
            <div id='f4' className="bg-blue-500 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.f4} onClick={() => { handlepiececlick("f4") }}><img className="" src="" alt="" /></button></div>
            <div id='f3' className="bg-gray-800 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.f3} onClick={() => { handlepiececlick("f3") }}><img className="" src="" alt="" /></button></div>
            <div id='f2' className="bg-blue-500 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.f2} onClick={() => { handlepiececlick("f2") }}><img className="" src="" alt="" /></button></div>
            <div id='f1' className="bg-gray-800 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.f1} onClick={() => { handlepiececlick("f1") }}><img className="" src="" alt="" /></button></div>
          </div>
          <div>
            <div id='g8' className="bg-gray-800 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.g8} onClick={() => { handlepiececlick("g8") }}><img className="" src="" alt="" /></button></div>
            <div id='g7' className="bg-blue-500 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.g7} onClick={() => { handlepiececlick("g7") }}><img className="" src="" alt="" /></button></div>
            <div id='g6' className="bg-gray-800 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.g6} onClick={() => { handlepiececlick("g6") }}><img className="" src="" alt="" /></button></div>
            <div id='g5' className="bg-blue-500 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.g5} onClick={() => { handlepiececlick("g5") }}><img className="" src="" alt="" /></button></div>
            <div id='g4' className="bg-gray-800 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.g4} onClick={() => { handlepiececlick("g4") }}><img className="" src="" alt="" /></button></div>
            <div id='g3' className="bg-blue-500 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.g3} onClick={() => { handlepiececlick("g3") }}><img className="" src="" alt="" /></button></div>
            <div id='g2' className="bg-gray-800 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.g2} onClick={() => { handlepiececlick("g2") }}><img className="" src="" alt="" /></button></div>
            <div id='g1' className="bg-blue-500 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.g1} onClick={() => { handlepiececlick("g1") }}><img className="" src="" alt="" /></button></div>
          </div>
          <div>
            <div id='h8' className="bg-blue-500 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.h8} onClick={() => { handlepiececlick("h8") }}><img className="" src="" alt="" /></button></div>
            <div id='h7' className="bg-gray-800 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.h7} onClick={() => { handlepiececlick("h7") }}><img className="" src="" alt="" /></button></div>
            <div id='h6' className="bg-blue-500 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.h6} onClick={() => { handlepiececlick("h6") }}><img className="" src="" alt="" /></button></div>
            <div id='h5' className="bg-gray-800 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.h5} onClick={() => { handlepiececlick("h5") }}><img className="" src="" alt="" /></button></div>
            <div id='h4' className="bg-blue-500 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.h4} onClick={() => { handlepiececlick("h4") }}><img className="" src="" alt="" /></button></div>
            <div id='h3' className="bg-gray-800 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.h3} onClick={() => { handlepiececlick("h3") }}><img className="" src="" alt="" /></button></div>
            <div id='h2' className="bg-blue-500 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.h2} onClick={() => { handlepiececlick("h2") }}><img className="" src="" alt="" /></button></div>
            <div id='h1' className="bg-gray-800 square w-20 h-20 p-0 m-0 flex items-center justify-center"><button disabled={buttonStates.h1} onClick={() => { handlepiececlick("h1") }}><img className="" src="" alt="" /></button></div>
          </div>
        </div>
        <div className="w-full">
          <button onClick={togglePlaying} disabled={isreallyplaying} className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none w-52 ml-5 disabled:bg-indigo-200 hover:bg-indigo-600 rounded">{!isPlaying ? "Start Playing" : "Stop Playing"}</button>
          <button id="newgamebut" onClick={initiatenewgame} hidden={true} className="ml-3 p-2 bg-blue-500 rounded-md">New Game</button>
          <div className="container px-5 py-8 flex flex-wrap mx-auto items-center">
            <div className="flex md:flex-nowrap flex-wrap justify-center items-end md:justify-start">
              <div className="relative sm:w-64 w-40 sm:mr-4 mr-2">
                <label htmlFor="footer-field" className="leading-7 text-sm text-gray-600">{!isPlaying ? "Search User (Click on Start Playing)" : "Search User"}</label>
                <input placeholder="Name or Email" disabled={!isPlaying || isreallyplaying} onChange={searchusers} ref={suser} type="text" id="footer-field" name="footer-field" className="w-full bg-gray-800 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:bg-transparent focus:ring-indigo-200 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
              <button disabled={!isPlaying || isreallyplaying} className="inline-flex disabled:bg-blue-100 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Search</button>
            </div>
          </div>
          {searcheduser && suser.current.value ? searcheduser.map((user, index) => (
            <div key={index} className="flex items-center justify-between w-1/2 ml-5 p-2">
              <div className="text-white text-xl">
                {user.name}
              </div>
              <button disabled={isreallyplaying} onClick={() => { initiateGame(user._id) }} className="p-2 border-2 text-white border-white disabled:bg-gray-200 disabled:cursor-default rounded-lg cursor-pointer hover:text-gray-400">
                Play
              </button>
            </div>
          )) :
            <div></div>
          }
          {modaltoggle && <div id="defaultModal" className="relative z-50 w-72 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative w-full max-w-2xl max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {newchallenger && `New Challenge from ${newchallenger.my.myname}`}
                  </h3>
                </div>
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button data-modal-hide="defaultModal" onClick={acceptchallenge} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                  <button data-modal-hide="defaultModal" onClick={rejectchallenge} type="button" className="text-gray-500 bg-white hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                </div>
              </div>
            </div>
          </div>}
          {isreallyplaying && <div className="bottom-0 m-3 absolute border border-white px-10 rounded-md w-[700px] text-white">
            <div className="flex justify-between">
              <div className="m-3">
                {user.name} is Playing as {gamedata.black._id && gamedata.black._id == user._id ? "Black" : "White"}
              </div>
              <div className="m-3">
                {gamedata.black._id && gamedata.black._id == user._id ? gamedata.white.name : gamedata.black.name} is Playing as {gamedata.black._id && !gamedata.black._id == user._id ? "Black" : "White"}
              </div>
            </div>
            <div id="tobecentered" className="text-2xl p-2 flex justify-center">
              {!gamedata.isOver ? `It is ${gamedata.black._id && gamedata.whoToMove == user._id ? user.name : gamedata.black._id == user._id ? gamedata.white.name : gamedata.black.name} Turn!!!` : `Good Game! ${gamedata.wonBy.name} won by ${gamedata.reasonForWin}`}
            </div>
          </div>}
        </div>
      </div>
    </>
  )
}
