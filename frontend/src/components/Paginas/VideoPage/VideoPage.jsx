import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import axios from '../../../api/axios-config'
import styles from './VideoPage.module.css'
import Layout from '../../Layout/Layout'

const VideoPage = () => {
  const { videoId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const [videoData, setVideoData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [recommendedVideos, setRecommendedVideos] = useState([])
  const [recommendedError, setRecommendedError] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [creatorProfilePhoto, setCreatorProfilePhoto] = useState('https://st4.depositphotos.com/29453910/37778/v/450/depositphotos_377785374-stock-illustration-hand-drawn-modern-man-avatar.jpg')

  useEffect(() => {
    document.documentElement.classList.add(styles.htmlVideoPage)
    return () => {
      document.documentElement.classList.remove(styles.htmlVideoPage)
    }
  }, [])

  const getVideoSource = useCallback((videoKey) => {
    if (!videoKey) return ''
    return `https://tcc-fiec-ti-informa.s3.us-east-2.amazonaws.com/${videoKey}`
  }, [])

  const getThumbnailSource = useCallback((videoKey) => {
    if (!videoKey) return 'https://via.placeholder.com/320x180'
    return `https://tcc-fiec-ti-informa.s3.us-east-2.amazonaws.com/thumbnails/${videoKey.replace('.mp4', '.jpg')}`
  }, [])

  useEffect(() => {
    const fetchVideoData = async () => {
      setLoading(true)
      setError('')
      setRecommendedError('')

      const token = localStorage.getItem('token')
      const headers = token ? { Authorization: `Bearer ${token}` } : {}

      let currentVideoData = null

      try {
        if (location.state?.video && (location.state.video.id_video || location.state.video.id)) {
          currentVideoData = location.state.video
          setVideoData(currentVideoData)
        } else {
          if (!videoId) {
            throw new Error('ID do vídeo não encontrado')
          }
          const response = await axios.get(`/file/video/${videoId}`, { headers })
          if (!response.data) {
            throw new Error('Dados do vídeo não recebidos')
          }
          currentVideoData = response.data
          setVideoData(currentVideoData)
        }

        if (currentVideoData?.criador?.fotoPerfil) {
          setCreatorProfilePhoto(currentVideoData.criador.fotoPerfil)
        } else {
          setCreatorProfilePhoto('https://st4.depositphotos.com/29453910/37778/v/450/depositphotos_377785374-stock-illustration-hand-drawn-modern-man-avatar.jpg')
        }

      } catch (err) {
        console.error('Erro ao carregar vídeo principal:', err)
        setError(err.message || 'Erro ao carregar o vídeo. Por favor, tente novamente.')
        setLoading(false) 
        return 
      } finally {
        if (currentVideoData) setLoading(false);
      }

      if (currentVideoData) {
        try {
          const recResponse = await axios.get('/file/videos-recomendados', { headers })
          setRecommendedVideos(Array.isArray(recResponse.data) ? recResponse.data : [])
        } catch (recError) {
          console.error('Erro ao buscar recomendados:', recError)
          setRecommendedVideos([])
          setRecommendedError('Não foi possível carregar vídeos recomendados no momento.')
        }

        if (token && currentVideoData.id_criador) {
          try {
            const subResponse = await axios.get(`/subscriptions/check/${currentVideoData.id_criador}`, { headers })
            setIsSubscribed(subResponse.data?.isSubscribed || false)
          } catch (subError) {
            console.error('Erro ao verificar inscrição:', subError)
            setIsSubscribed(false)
          }
        }
      }
      setLoading(false);
    }

    fetchVideoData()
  }, [videoId, location.state, navigate, getVideoSource, getThumbnailSource]) 

  const handleSubscribe = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/login')
        return
      }

      if (!videoData?.id_criador) {
        throw new Error('Criador do vídeo não identificado')
      }

      if (isSubscribed) {
        await axios.delete(`/subscriptions/unsubscribe/${videoData.id_criador}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      } else {
        await axios.post(`/subscriptions/subscribe/${videoData.id_criador}`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        })
      }
      setIsSubscribed(!isSubscribed)
    } catch (err) {
      console.error('Erro na inscrição:', err)
      alert(err.response?.data?.message || 'Erro ao processar inscrição. Tente novamente.')
    }
  }

  const formatDate = useCallback((dateString) => {
    try {
      if (!dateString) return 'Data desconhecida'
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString('pt-BR', options)
    } catch {
      return 'Data inválida'
    }
  }, [])

  const handleRecommendedVideoClick = useCallback((video) => {
    if (!video) return
    navigate(`/video/${video.id_video || video.id}`, {
      state: { video },
      replace: true
    })
  }, [navigate])


  if (loading) {
    return (
      <div className={styles.container}>
        <Layout />
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Carregando vídeo...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <Layout />
        <div className={styles.errorContainer}>
          <p className={styles.errorMessage}>{error}</p>
          <button
            className={styles.backButton}
            onClick={() => navigate('/')}
          >
            Voltar para a página inicial
          </button>
        </div>
      </div>
    )
  }

  if (!videoData) {
    return (
      <div className={styles.container}>
        <Layout />
        <div className={styles.errorContainer}>
          <p>Vídeo não encontrado</p>
          <button
            className={styles.backButton}
            onClick={() => navigate(-1)}
          >
            Voltar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Layout />
      <div className={styles.videoPageContainer}>
        <div className={styles.mainContent}>
          <div className={styles.videoPlayerContainer}>
            <video
              controls
              autoPlay
              className={styles.videoPlayer}
              src={getVideoSource(videoData.key)}
              onError={(e) => {
                console.error('Erro ao carregar vídeo:', e)
                e.target.parentElement.innerHTML = `
                  <div class="${styles.videoError}">
                    <p>Erro ao carregar o vídeo</p>
                    <button
                      class="${styles.retryButton}"
                      onclick="window.location.reload()"
                    >
                      Tentar novamente
                    </button>
                  </div>
                `
              }}
            >
              Seu navegador não suporta vídeos HTML5.
            </video>
          </div>

          <div className={styles.videoInfo}>
            <div className={styles.videoInfoContainer}>
              <h1 className={styles.videoTitle}>{videoData.titulo || 'Título não disponível'}</h1>

              <div className={styles.videoMetadata}>
                <span className={styles.videoStat}>
                  <span>{videoData.visualizacoes || 0} visualizações</span>
                </span>
                <span className={styles.videoStat}>•</span>
                <span className={styles.videoStat}>
                  <span>{formatDate(videoData.dataPublicacao)}</span>
                </span>
              </div>

              <div className={styles.creatorInfo}>
                <div className={styles.creatorLeft}>
                  <img
                    src={creatorProfilePhoto} 
                    alt={videoData.criador?.nome || 'Criador'}
                    className={styles.creatorAvatar}
                    onError={(e) => {
                      e.target.src = 'https://st4.depositphotos.com/29453910/37778/v/450/depositphotos_377785374-stock-illustration-hand-drawn-modern-man-avatar.jpg' 
                    }}
                  />
                  <div>
                    <h3 className={styles.creatorName}>
                      {videoData.criador?.nome || 'Criador desconhecido'}
                    </h3>
                    <p className={styles.subscriberCount}>
                      {videoData.criador?.totalInscritos || 0} inscritos
                    </p>
                  </div>
                </div>
                {videoData.id_criador && (
                  <button
                    className={`${styles.subscribeButton} ${isSubscribed ? styles.subscribed : ''}`}
                    onClick={handleSubscribe}
                    disabled={!videoData.id_criador}
                  >
                    {isSubscribed ? 'Inscrito' : 'Inscrever-se'}
                  </button>
                )}
              </div>

              <div className={styles.videoDescription}>
                <p>{videoData.descricao || 'Este vídeo não possui descrição.'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sidebar}>
          <h3 className={styles.recommendationsTitle}>Recomendados</h3>
          <div className={styles.recommendedVideos}>
            {recommendedError ? (
              <p className={styles.errorMessage}>{recommendedError}</p> 
            ) : recommendedVideos.length > 0 ? (
              recommendedVideos.map((video) => (
                <div
                  key={video.id_video || video.id}
                  className={styles.recommendedVideoCard}
                  onClick={() => handleRecommendedVideoClick(video)}
                >
                  <div className={styles.thumbnailContainer}>
                    <img
                      src={getThumbnailSource(video.key)}
                      alt={video.titulo}
                      className={styles.thumbnail}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/168x94'
                      }}
                    />
                    <span className={styles.videoDuration}>10:30</span>
                  </div>
                  <div className={styles.recommendedVideoInfo}>
                    <h4 className={styles.recommendedVideoTitle}>
                      {video.titulo || 'Vídeo sem título'}
                    </h4>
                    <p className={styles.recommendedVideoCreator}>
                      {video.criador?.nome || 'Criador desconhecido'}
                    </p>
                    <p className={styles.recommendedVideoStats}>
                      {video.visualizacoes || 0} visualizações • {formatDate(video.dataPublicacao)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.noRecommendations}>Nenhum vídeo recomendado disponível</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoPage