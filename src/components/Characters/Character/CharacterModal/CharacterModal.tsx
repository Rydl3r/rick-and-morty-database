import { ICharacter } from "../../../../models/models";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

interface CharacterModalProps {
  data: ICharacter;
  toggleModal: () => void;
  open: boolean;
}

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "35%",
  maxWidth: "50%",
  maxHeight: "70%",
  overflow: "auto",
};

const CharacterModal = ({ data, open, toggleModal }: CharacterModalProps) => {
  return (
    <Modal
      open={open}
      onClose={toggleModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={modalStyle}>
        <CardMedia
          component="img"
          height="140"
          image={data.image}
          alt={data.name}
          sx={{ width: "100%", height: "auto", objectFit: "cover" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.name}
          </Typography>
          <Typography variant="body2" color="text" sx={{ fontWeight: "bold" }}>
            {data.species + ", " + data.gender}
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="body2"
              color="text"
              sx={{ fontWeight: "bold", marginRight: "5px" }}
            >
              Status:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.status}
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="body2"
              color="text"
              sx={{ fontWeight: "bold", marginRight: "5px" }}
            >
              Type:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.type || "unknown"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="body2"
              color="text"
              sx={{ fontWeight: "bold", marginRight: "5px" }}
            >
              Origin:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.origin.name}
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="body2"
              color="text"
              sx={{ fontWeight: "bold", marginRight: "5px" }}
            >
              Currently On:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.location.name}
            </Typography>
          </Box>
          <Typography variant="body2" color="text" sx={{ fontWeight: "bold" }}>
            List Of Episodes:
          </Typography>
          <Box sx={{ maxHeight: "100px", overflow: "auto", marginTop: "10px" }}>
            {data.episode.map((episode, idx) => (
              <Typography key={idx} variant="body2" color="text.secondary">
                {episode}
              </Typography>
            ))}
          </Box>
        </CardContent>
        <CardActions sx={{ marginLeft: "10px" }}>
          <Button size="small">
            <Link href={data.url} underline="none" target="_blank">
              Learn more
            </Link>
          </Button>
          <Button onClick={() => toggleModal()} size="small">
            Close
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
};

export default CharacterModal;
