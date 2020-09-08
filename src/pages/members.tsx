import { Container, Divider, Avatar, Dialog, ButtonBase, DialogContent, IconButton } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {Web, Email, GitHub, LinkedIn} from '@material-ui/icons';
import { NextPage } from "next";
import React, { FunctionComponent, Fragment } from "react";
import ContentsLayout from "../components/layouts/ContentsLayout";
import { Member } from "../interfaces";

const useMainStyles = makeStyles(theme =>
    createStyles({
        paper: {
            marginTop: theme.spacing(8),
            fontFamily: "Candara, san-serif"
        },

        pageTitle: {
            padding: 0,
            margin: "-5px",
            fontWeight: "bolder",
            fontFamily: "Calibri, sans-serif",
            fontSize: "70px",
            letterSpacing: 1.5,
            textAlign: "center",
            textShadow: "-3px 3px 5px #ccd4e3CC"
        },

        divider: {
            opacity: 0.35
        },

        footerMembers: {
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center"
        },
    })
);

const useModalStyles = makeStyles(theme => 
    createStyles({
        paper: {
            width: '1250px',
            borderRadius: '5%',
            padding: '30px'
        },

        content: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },

        title: {
            margin: 0,
            paddingTop: '10px',
            fontWeight: "bold",
            fontFamily: "Calibri, sans-serif",
            fontSize: "50px",
            letterSpacing: 1.5,
            textAlign: "center",
            textShadow: "-3px 3px 5px #ccd4e3CC"
        },

        avatarContainer: {
            borderRadius: '100%',
        },

        avatar: {
            width: theme.spacing(16),
            height: theme.spacing(16),
            boxShadow: "0px 7px 17px #ccd4e3"
        },

        heading: {
            margin: 0,
            paddingTop: '5px',
            paddingBottom: '5px',
            fontSize: '23px',
            fontWeight: 'bolder',
            alignSelf: 'flex-start',
            color: "#536075"
        },

        icon: {
            color: '#2185ED',
        },

        description: {
            padding: '10px',
            color: "#7a89a3",
            textAlign: 'center',
            fontStyle: 'italic'
        },
    })
);

const useSectionStyles = makeStyles(theme =>
    createStyles({
        section: {
            paddingLeft: props => (props.lite ? "50px" : 0),
            paddingRight: props => (props.lite ? "50px" : 0),
            paddingTop: "50px",
            paddingBottom: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: props => props.alignment
        },

        heading: {
            paddingBottom: "35px",
            display: "flex",
            alignItems: props => props.alignment,
            flexDirection: "column"
        },

        headingText: {
            fontFamily: "Calibri, sans-serif",
            fontWeight: "bold",
            fontSize: props => (props.lite ? "40px" : "50px")
        },

        headingUnderline: {
            height: "5px",
            width: props => (props.lite ? "50px" : "100px"),
            borderBottomLeftRadius: (props: SectionProps) =>
                props.alignment == "center" ? "100px" : 0,
            borderBottomRightRadius: "100px",
            backgroundImage: props =>
                `linear-gradient(to right, ${props.underlineColourLeft} 0%, ${props.underlineColourRight} 100%)`
        },

        members: {
            display: "flex",
            justifyContent: props => props.alignment,
            flexWrap: "wrap"
        },

        member: {
            paddingRight: props => (props.alignment == "flex-start" ? "80px" : "25px"),
            paddingLeft: props => (props.alignment == "flex-end" ? "80px" : "25px"),
            paddingBottom: "25px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center"
        },

        memberAvatar: {
            width: props => (props.lite ? theme.spacing(8) : theme.spacing(12)),
            height: props => (props.lite ? theme.spacing(8) : theme.spacing(12)),
            boxShadow: props => (props.lite ? "0px 3px 10px #ccd4e3EE" : "0px 5px 15px #ccd4e3")
        },

        memberName: {
            paddingTop: props => (props.lite ? "5px" : "10px"),
            paddingBottom: "0px",
            margin: "0px",
            fontSize: props => (props.lite ? "20px" : "25px"),
            fontWeight: props => (props.lite ? 500 : 600),
            letterSpacing: 2,
            textShadow: "1px 1px 2px #e1e5eb",
            color: "#7a89a3"
        },

        memberTitle: {
            padding: "0px",
            fontStyle: "italic",
            fontFamily: "Candara, san-serif",
            fontSize: props => (props.lite ? "11px" : "13px"),
            letterSpacing: 2,
            textShadow: "1px 1px 2px #e6eaf0",
            color: "#7a89a3"
        },
    })
);

interface MemberListingProps {
    member: Member;
    classes?: any;
}

/*
A container for holding the avatar, name and title of a member
*/
const MemberListing: FunctionComponent<MemberListingProps> = props => {
    const modalClasses = useModalStyles();
    const [modalDisplayed, setModalDisplayed] = React.useState(false);

    const toggleModal = () => {
        setModalDisplayed(!modalDisplayed);
    }

    return (
        <Fragment>
            <div className={props.classes.member}>
                <ButtonBase onClick={toggleModal} className={modalClasses.avatarContainer} style={{ outline: 0 }}>
                    <Avatar className={props.classes.memberAvatar}/>
                </ButtonBase>
                <h6 className={props.classes.memberName}>{props.member.name}</h6>
                <h6 className={props.classes.memberTitle}>{props.member.title}</h6>
            </div>
            <Dialog
                classes={{
                    paper: modalClasses.paper
                }}
                open={modalDisplayed}
                onClose={toggleModal}
                onBackdropClick={toggleModal}
            >
                <DialogContent className={modalClasses.content}>
                    <Avatar className={modalClasses.avatar}/>
                    <h3 className={modalClasses.title}>Name</h3>
                    <div>
                        <IconButton style={{ outline: 0 }}>
                            <Web className={modalClasses.icon} fontSize='small'/>
                        </IconButton>

                        <IconButton style={{ outline: 0 }}>
                            <Email className={modalClasses.icon} fontSize='small'/>
                        </IconButton>

                        <IconButton style={{ outline: 0 }}>
                            <GitHub className={modalClasses.icon} fontSize='small'/>
                        </IconButton>

                        <IconButton style={{ outline: 0 }}>
                            <LinkedIn className={modalClasses.icon} fontSize='small'/>
                        </IconButton>
                    </div>

                    <div className={modalClasses.description}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in egestas tortor. Vivamus tempus lacinia molestie. Etiam placerat interdum tortor dictum ultrices. Cras fringilla facilisis lorem eu blandit. Morbi gravida fringilla sagittis. Duis at blandit mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam vestibulum quam mi, nec porta nisl fringilla eu. Mauris facilisis eros sem, nec volutpat mi bibendum vel. Nullam eget tortor in magna sagittis condimentum ac in magna. Integer id consequat enim. Praesent sodales ante non sollicitudin euismod. Nunc a ipsum varius, euismod dolor a, viverra nibh.
                    </div>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
};

interface SectionProps {
    label: string;
    members: Member[];
    lite?: boolean;
    alignment?: "flex-start" | "center" | "flex-end";
    underlineColourLeft?: string;
    underlineColourRight?: string;
}

const defaultSectionProps: SectionProps = {
    label: "Section",
    members: [],
    alignment: "flex-start",
    lite: false,
    underlineColourLeft: "#09C6F9",
    underlineColourRight: "#045DE9"
};

const Section: FunctionComponent<SectionProps> = (preProps: SectionProps) => {
    const props = { ...defaultSectionProps, ...preProps };
    const classes = useSectionStyles(props);

    return (
        <div className={classes.section}>
            <div className={classes.heading}>
                <h1 className={classes.headingText}>{props.label}</h1>
                <div className={classes.headingUnderline}></div>
            </div>

            <div className={classes.members}>
                {props.members.map((memb, i) => (
                    <MemberListing key={i} member={memb} classes={classes} />
                ))}
            </div>
        </div>
    );
};

const Page: NextPage = () => {
    const classes = useMainStyles();

    // TO-DO: Replace placeholder members with actual members using Firebase API
    const placeholderMembers = Array<Member>(10).fill({
        id: "_",
        name: "Name",
        displayName: "_",
        title: "Title",
        email: "_",
        description: "_",
        facts: [],
        links: [],
        image: "_"
    });

    const sections = new Map([
        ["Executives", placeholderMembers.slice(0, 6)],
        ["Managers", placeholderMembers.slice(0, 2)],
        ["Website Committee", placeholderMembers.slice(0, 6)],
        ["Active Members", placeholderMembers.slice(0, 3)]
    ]);

    const sectionElements: JSX.Element[] = [];
    let sectionFragmentKey = 0;

    sections.forEach((members, memberSection) => {
        sectionElements.push(
            <Fragment key={sectionFragmentKey++}>
                <Section label={memberSection} members={members} />
                <Divider className={classes.divider} orientation="horizontal" />
            </Fragment>
        );
    });

    return (
        <ContentsLayout title="Members">
            <Container component="main">
                <div className={classes.paper}>
                    <h1 className={classes.pageTitle}>Members</h1>

                    {sectionElements}

                    <div className={classes.footerMembers}>
                        <Section
                            lite
                            underlineColourLeft="#8cdef5"
                            underlineColourRight="#6c9be6"
                            alignment="center"
                            label="Past Executives"
                            members={placeholderMembers.slice(0, 7)}
                        />
                        <Divider flexItem className={classes.divider} orientation="vertical" />
                        <Section
                            lite
                            underlineColourLeft="#8cdef5"
                            underlineColourRight="#6c9be6"
                            alignment="center"
                            label="Alumni"
                            members={placeholderMembers.slice(0, 6)}
                        />
                    </div>
                </div>
            </Container>
        </ContentsLayout>
    );
};

export default Page;
