'use client';

/* eslint-disable @next/next/no-img-element */
import React, { MutableRefObject, useEffect, useState } from 'react';
import { Message } from './ChatWindow';
import { cn, isRtl } from '@/lib/utils';
import {
  BookCopy,
  Volume2,
  StopCircle,
  Layers3,
  Plus,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react';
import Markdown from 'markdown-to-jsx';
import Copy from './MessageActions/Copy';
import Rewrite from './MessageActions/Rewrite';
import MessageSources from './MessageSources';
import SearchImages from './SearchImages';
import SearchVideos from './SearchVideos';
import { useSpeech } from 'react-text-to-speech';
import Image from 'next/image';
import Tooltip from './Tooltip';
import { useTranslations } from 'next-intl';
const detectLanguage = (text: string): string => {
  const arabicPattern = /[\u0600-\u06FF]/;
  const frenchPattern = /[éèêëàâùûçîïüÿæœ]/i;

  if (arabicPattern.test(text)) return 'ar-SA';
  if (frenchPattern.test(text)) return 'fr-FR';
  return 'en-US';
};

const MessageBox = ({
  message,
  messageIndex,
  history,
  loading,
  dividerRef,
  isLast,
  rewrite,
  sendMessage,
}: {
  message: Message;
  messageIndex: number;
  history: Message[];
  loading: boolean;
  dividerRef?: MutableRefObject<HTMLDivElement | null>;
  isLast: boolean;
  rewrite?: (messageId: string) => void;
  sendMessage: (message: string) => void;
}) => {
  const [parsedMessage, setParsedMessage] = useState(message.content);
  const [speechMessage, setSpeechMessage] = useState(message.content);
  const [speechLang, setSpeechLang] = useState('en-US');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);


  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);


  useEffect(() => {
    if (voices.length > 0) {
      const voice = voices.find(v => v.lang.startsWith(speechLang)) || voices[0];
      setSelectedVoice(voice);
    }
  }, [voices, speechLang]);

  useEffect(() => {
    const regex = /\[(\d+)\]/g;

    if (
      message.role === 'assistant' &&
      message?.sources &&
      message.sources.length > 0
    ) {
      return setParsedMessage(
        message.content
      );
      return;
    }
    const detectedDirection = isRtl(message.content) ? "rtl" : "ltr";
    setDirection(detectedDirection);

    const cleanMessage = message.content.replace(regex, '');
    setSpeechMessage(cleanMessage);
    setSpeechLang(detectLanguage(cleanMessage));
  }, [message.content, message.sources, message.role]);

  const { speechStatus, start, stop } = useSpeech({
    text: speechMessage,
    lang: speechLang,
    // voice: selectedVoice,
    rate: 1.0,
    pitch: 1.0,
    volume: 1.0
  });


    // setParsedMessage(message.content);
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");
  const t = useTranslations('tooltips');
  return (
    <div>
      {message.role === 'user' && (
        <div className={cn('w-full flex justify-end', messageIndex === 0 ? 'pt-16' : 'pt-8')}>
          <div className="max-w-[70%] w-fit rounded-full bg-[#f3f4f6] dark:bg-[#2f2f2f] px-5 py-2">
            <h2 dir={direction} className="text-black dark:text-white  font-[400] lg:text-[16px]">
              {message.content}
            </h2>
          </div>
        </div>
      )}

      {message.role === 'assistant' && (
        <div className="flex flex-col space-y-9 lg:space-y-0 lg:flex-row lg:justify-between lg:space-x-9">
          <div
            ref={dividerRef}
            className="flex flex-col space-y-6 w-full"
          >
            {message.sources && message.sources.length > 0 && (
              <div className="flex flex-col space-y-2">
                <div className="flex flex-row items-center space-x-2">
                  <BookCopy className="text-black dark:text-white" size={20} />
                  <h3 className="text-black dark:text-white font-medium text-xl">
                    Sources
                  </h3>
                </div>
                <MessageSources sources={message.sources} />
              </div>
            )}
            <div className="flex flex-col space-y-2">

              <Markdown
                dir={direction}
                className={cn(
                  'prose prose-h1:mb-3 prose-h2:mb-2 prose-h2:mt-6 prose-h2:font-[800] prose-h3:mt-4 prose-h3:mb-1.5 prose-h3:font-[600] dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 font-[400]',
                  'max-w-none break-words text-black dark:text-white',
                )}
              >
                {message.content}
              </Markdown>
              {loading && isLast ? null : (
                <div className="flex flex-row items-center justify-between w-full text-black dark:text-white py-4 -mx-2">
                  <div className="flex flex-row items-center space-x-1">
                    {/*  <button className="p-2 text-black/70 dark:text-white/70 rounded-xl hover:bg-light-secondary dark:hover:bg-dark-secondary transition duration-200 hover:text-black text-black dark:hover:text-white">
                      <Share size={18} />
                    </button> */}
                    {/* <Rewrite rewrite={rewrite} messageId={message.messageId} /> */}
                  </div>
                 <div className="flex flex-row items-center space-x-1">
                 {/* <Tooltip content={t('good_response')} position="bottom">
                      <ThumbsUp size={18} className="cursor-pointer" />
                    </Tooltip>
                    <Tooltip content={t('bad_response')} position="bottom">
                      <ThumbsDown size={18} className="cursor-pointer" />
                    </Tooltip>*/}

                    <Tooltip content={t('copy')} position='bottom'>
                      <Copy initialMessage={message.content} message={message} />
                    </Tooltip>

                    {/*<button
                      onClick={() => {
                        if (speechStatus === 'started') {
                          stop();
                        } else {
                          start();
                        }
                      }}
                      className="p-2 text-black/70 dark:text-white/70 rounded-xl hover:bg-light-secondary dark:hover:bg-dark-secondary transition duration-200 hover:text-black dark:hover:text-white"
                    >
                      {speechStatus === 'started' ? (
                        <Tooltip content={t('stop')} position="bottom">
                        <StopCircle size={18} />
                        </Tooltip>
                      ) : (
                        <Tooltip content={t('read_aloud')} position="bottom">
                        <Volume2 size={18} />
                        </Tooltip>
                      )}
                    </button>*/}
                  </div>
                </div>
              )}
              {/* {isLast &&
                message.suggestions &&
                message.suggestions.length > 0 &&
                message.role === 'assistant' &&
                !loading && (
                  <>
                    <div className="h-px w-full bg-light-secondary dark:bg-dark-secondary" />
                    <div className="flex flex-col space-y-3 text-black dark:text-white">
                      <div className="flex flex-row items-center space-x-2 mt-4">
                        <Layers3 />
                        <h3 className="text-xl font-medium">Related</h3>
                      </div>
                      <div className="flex flex-col space-y-3">
                        {message.suggestions.map((suggestion, i) => (
                          <div
                            className="flex flex-col space-y-3 text-sm"
                            key={i}
                          >
                            <div className="h-px w-full bg-light-secondary dark:bg-dark-secondary" />
                            <div
                              onClick={() => {
                                sendMessage(suggestion);
                              }}
                              className="cursor-pointer flex flex-row justify-between font-medium space-x-2 items-center"
                            >
                              <p className="transition duration-200 hover:text-[#24A0ED]">
                                {suggestion}
                              </p>
                              <Plus
                                size={20}
                                className="text-[#24A0ED] flex-shrink-0"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )} */}
            </div>
          </div>
          {/* <div className="lg:sticky lg:top-20 flex flex-col items-center space-y-3 w-full lg:w-3/12 z-30 h-full pb-4">
            <SearchImages
              query={history[messageIndex - 1].content}
              chatHistory={history.slice(0, messageIndex - 1)}
            />
            <SearchVideos
              chatHistory={history.slice(0, messageIndex - 1)}
              query={history[messageIndex - 1].content}
            />
          </div> */}
        </div>
      )}
    </div>
  );
};

export default MessageBox;
