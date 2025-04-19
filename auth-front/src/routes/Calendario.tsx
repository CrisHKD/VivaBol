
import { useAuth } from "../auth/AuthProvider";
import DefaultHeader from "../layout/HeaderDefault";
import Footer from "../layout/Footer";
import { Box } from "@mui/material";

//TIMELINE
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';



export default function Calendario(){
    const auth = useAuth();
    return (
        <DefaultHeader>
            <Box 
                sx={{

                    width: '100%',
                    justifyContent: 'center', // Centrado horizontal
                    padding: '36px',          // Espaciado alrededor de los componentes
                }}
            />
            <Timeline
                sx={{
                    [`& .${timelineOppositeContentClasses.root}`]: {
                    flex: 0.2,
                    },
                }}
                >
                <TimelineItem>
                    <TimelineOppositeContent color="textSecondary">
                    09:30 am
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>Eat
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineOppositeContent color="textSecondary">
                    10:00 am
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                    <TimelineDot />
                    </TimelineSeparator>
                    <TimelineContent>Code</TimelineContent>
                </TimelineItem>
            </Timeline> 
            <Footer/>          
        </DefaultHeader>

    );
}