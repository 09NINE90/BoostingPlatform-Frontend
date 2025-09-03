import {
    Box,
    Typography,
    Checkbox,
    FormControlLabel,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Chip,
    Divider
} from '@mui/material';
import theme from "src/theme/theme.jsx";
import React, {useCallback, useEffect, useState} from "react";
import BlueTextField from "src/layouts/utils/ui/BlueTextField.jsx";
import ContainedBlueButton from "src/layouts/utils/ui/ContainedBlueButton.jsx";
import {getGamesNames} from "src/services/gamesApi.js";
import {becomeBooster} from "src/services/userApi.js";
import {NavLink} from "react-router-dom";

const BecomeBoosterPage = () => {

    const [success, setSuccess] = useState(false)
    const [formData, setFormData] = useState({
        nickname: '',
        email: '',
        discordTag: '',
        selectedGames: [],
        customGames: '',
        gamingExperience: '',
        boostingExperience: '',
        trackerLinks: '',
        progressImages: '',
        additionalInfo: ''
    });

    const [manualGameInput, setManualGameInput] = useState(false);
    const [gamesList, setGamesList] = useState([]);

    const fetchGamesNames = async () => {
        try {
            const gamesApi = await getGamesNames();
            setGamesList(gamesApi)
        } catch (err) {
            console.error(err)
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleGameSelect = (event) => {
        const {value} = event.target;
        setFormData(prev => ({...prev, selectedGames: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await becomeBooster(formData);
            setSuccess(true)
        } catch (err) {
            console.log(err)
        }
    };

    const allFieldsFilledIn = useCallback(() => {
        return !(
            formData.nickname.trim() !== '' &&
            formData.email.trim() !== '' &&
            formData.selectedGames.length > 0 &&
            formData.gamingExperience.trim() !== '' &&
            formData.boostingExperience.trim() !== ''
        );
    }, [formData]);

    useEffect(() => {
        fetchGamesNames()
    }, [fetchGamesNames])

    if (success) {
        return (
            <Box
                sx={{
                    p: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingInline: {xs: 2, md: 25},
                    height: 'fit-content',
                    minHeight: '400px'
                }}
            >
                <Box
                    sx={{
                        paddingInline: 10,
                        paddingBlock: 30,
                        backgroundColor: theme.palette.background.paper,
                        textAlign: 'center',
                        width: '100%',
                        '& p': {
                            fontSize: {xs: '1.1rem', md: '1.3rem'},
                            lineHeight: 1.6,
                            margin: 0
                        }
                    }}
                >
                    <Typography variant='h4'
                                sx={{
                                    color: theme.palette.text.primary,
                                    fontWeight: theme.typography.fontWeightRegular
                                }}
                    >
                        Your application has been accepted for consideration.
                    </Typography>
                    <Typography variant='body1'
                                sx={{
                                    color: theme.palette.text.secondary,
                                    fontWeight: theme.typography.fontWeightLight
                                }}
                    >
                        We will send a reply to the email address you specified within 24 hours.
                    </Typography>
                    <NavLink to={'/'}
                             className={'kanit-light text-sky-400 hover:text-sky-700 mt-5'}
                    >
                        Back to home page
                    </NavLink>
                </Box>
            </Box>
        )
    }

    if (!success) {
        return (
            <Box
                sx={{
                    p: 3,
                    display: 'flex',
                    paddingInline: {xs: 2, md: 25},
                    height: 'fit-content',
                    flexDirection: 'column',
                }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        mb: 3,
                        fontSize: {xs: 28, sm: 34},
                        fontWeight: theme.typography.fontWeightBold
                    }}>
                    Booster Application Form
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        p: 4,
                        backgroundColor: theme.palette.background.paper,
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: {xs: 'column', sm: 'row'},
                        gap: 3,
                        mb: 3
                    }}>
                        <BlueTextField
                            fullWidth
                            label="Nickname"
                            name="nickname"
                            value={formData.nickname}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />

                        <BlueTextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />

                        <BlueTextField
                            fullWidth
                            label="Discord Tag (e.g., Username#1234)"
                            name="discordTag"
                            value={formData.discordTag}
                            onChange={handleChange}
                            margin="normal"
                        />
                    </Box>

                    <Divider sx={{my: 3}}/>

                    {/* 4. Game Selection */}
                    <Typography variant="h6" gutterBottom sx={{mb: 2, fontWeight: theme.typography.fontWeightBold}}>
                        Games You Can Boost
                    </Typography>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={manualGameInput}
                                onChange={() => setManualGameInput(!manualGameInput)}
                                sx={{
                                    color: theme.palette.third.hover,
                                    '&.Mui-checked': {
                                        color: theme.palette.third.main,
                                    },
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 24,
                                    },
                                }}
                            />
                        }
                        label="Enter games manually"
                        sx={{mb: 2}}
                    />

                    {manualGameInput ? (
                        <BlueTextField
                            fullWidth
                            label="Enter games (comma separated)"
                            name="customGames"
                            value={formData.customGames}
                            onChange={handleChange}
                            margin="normal"
                            sx={{mb: 3}}
                            placeholder="e.g., Valorant, League of Legends, CS:GO"
                        />
                    ) : (
                        <FormControl fullWidth margin="normal" sx={{mb: 3}}>
                            <InputLabel
                                required={true}
                                sx={{
                                    '&.Mui-focused': {
                                        color: theme.palette.third.main,
                                    },
                                    '&.MuiInputLabel-shrink': {
                                        color: theme.palette.third.main,
                                    }
                                }}>Select games</InputLabel>
                            <Select
                                multiple
                                required={true}
                                label='Select games'
                                value={formData.selectedGames}
                                onChange={handleGameSelect}
                                renderValue={(selected) => (
                                    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value}/>
                                        ))}
                                    </Box>
                                )}
                                variant='outlined'
                                sx={{
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: theme.palette.third.main,
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: theme.palette.third.main,
                                    },
                                    color: theme.palette.third.main,
                                }}
                            >
                                {gamesList.map((game) => (
                                    <MenuItem key={game.id} value={game.name}
                                              sx={{
                                                  color: theme.palette.text.primary,
                                                  fontWeight: theme.typography.fontWeightLight,
                                                  backgroundColor: theme.palette.background.default,
                                                  '&.Mui-selected': {
                                                      backgroundColor: theme.palette.background.paper,
                                                      '&:hover': {
                                                          backgroundColor: theme.palette.background.paper,
                                                      },
                                                  },
                                                  '&:hover': {
                                                      backgroundColor: theme.palette.background.paper,
                                                  },
                                              }}>
                                        <Checkbox checked={formData.selectedGames.indexOf(game.name) > -1}
                                                  sx={{
                                                      color: theme.palette.third.hover,
                                                      '&.Mui-checked': {
                                                          color: theme.palette.third.main,
                                                      },
                                                      '& .MuiSvgIcon-root': {
                                                          fontSize: 24,
                                                      },
                                                  }}/>
                                        {game.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}

                    <Divider sx={{my: 3}}/>

                    {/* 5. Gaming Experience */}
                    <Typography variant="h6" gutterBottom sx={{mb: 2, fontWeight: theme.typography.fontWeightBold}}>
                        Gaming Experience
                    </Typography>
                    <BlueTextField
                        fullWidth
                        label="Your gaming experience (games played, hours, achievements)"
                        name="gamingExperience"
                        value={formData.gamingExperience}
                        onChange={handleChange}
                        margin="normal"
                        multiline
                        rows={4}
                        required
                        sx={{mb: 3}}
                    />

                    {/* 6. Boosting Experience */}
                    <Typography variant="h6" gutterBottom sx={{mb: 2, fontWeight: theme.typography.fontWeightBold}}>
                        Boosting Experience
                    </Typography>
                    <BlueTextField
                        fullWidth
                        label="Your boosting experience (platforms worked, duration, specialties)"
                        name="boostingExperience"
                        value={formData.boostingExperience}
                        onChange={handleChange}
                        margin="normal"
                        multiline
                        rows={4}
                        required
                        sx={{mb: 3}}
                    />

                    <Divider sx={{my: 3}}/>

                    {/* 7. Tracker Links */}
                    <Typography variant="h6" gutterBottom sx={{mb: 2, fontWeight: theme.typography.fontWeightBold}}>
                        Tracker Profiles
                    </Typography>
                    <BlueTextField
                        fullWidth
                        multiline
                        label="Tracker links (e.g., Valorant Tracker, OP.GG, Faceit)"
                        name="trackerLinks"
                        value={formData.trackerLinks}
                        onChange={handleChange}
                        margin="normal"
                        sx={{mb: 3}}
                        placeholder="https://tracker.gg/valorant/profile/..."
                    />

                    {/* 8. Progress Screenshots */}
                    <Typography variant="h6" gutterBottom sx={{mb: 2, fontWeight: theme.typography.fontWeightBold}}>
                        Progress Proof
                    </Typography>
                    <BlueTextField
                        fullWidth
                        multiline
                        label="Links to screenshots or stats (Imgur, Steam screenshots, etc.)"
                        name="progressImages"
                        value={formData.progressImages}
                        onChange={handleChange}
                        margin="normal"
                        sx={{mb: 3}}
                        placeholder="https://imgur.com/..."
                    />

                    <Typography variant="body2" color="text.secondary"
                                sx={{mb: 2, fontWeight: theme.typography.fontWeightLight}}>
                        Alternatively, you can upload files after submitting this form.
                    </Typography>

                    <Divider sx={{my: 3}}/>

                    {/* 9. Additional Information */}
                    <Typography variant="h6" gutterBottom sx={{mb: 2, fontWeight: theme.typography.fontWeightBold}}>
                        Additional Information
                    </Typography>
                    <BlueTextField
                        fullWidth
                        label="Anything else you'd like us to know"
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        margin="normal"
                        multiline
                        rows={4}
                        sx={{mb: 3}}
                    />

                    {/* Submit Button */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mt: 4
                    }}>
                        <ContainedBlueButton
                            type="submit"
                            variant="contained"
                            size="large"
                            onClick={() => handleSubmit}
                            disabled={allFieldsFilledIn()}
                            sx={{px: 6, py: 1.5, width: '100%'}}
                        >
                            Submit Application
                        </ContainedBlueButton>
                        {allFieldsFilledIn() && (
                            <Typography
                                variant="body2"
                                sx={{mt: 1, ml: 0.5, color: theme.palette.statuses.red}}
                            >
                                Please fill in all required fields.
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Box>
        );
    }
}

export default BecomeBoosterPage;