import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { toast } from '@/hooks/use-toast';
import { Brain, LoaderCircle } from 'lucide-react';
import { useContext, useState } from 'react';
import { 
  BtnBold,
  BtnItalic,
  BtnBulletList,
  BtnClearFormatting,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  HtmlButton,
  Separator,
  Editor,
  EditorProvider,
  Toolbar
} from 'react-simple-wysiwyg';
import { AIChatSession } from './../../../../service/AIModel'


const PROMPT = "position title: {positionTitle}, depends on position title give me 5-7 bullet points for my experience in resume, give  me result in html format"
const RichTextEditor = ({onRichTextEditorChange, index, defaultValue}) => {

    const [value, setValue] = useState(defaultValue);
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
    const [loading, setLoading] = useState(false)
    
    const generateSummaryFromAI = async () => {
      setLoading(true)
      if(!resumeInfo.experience[index].title){
        return toast({title:"Please Add Position Title"})
      }
      const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title)
      const result = await AIChatSession.sendMessage(prompt)
      console.log(result.response.text())
      const res = result.response.text()
      setValue(res.replace('[','').replace(']',''))
      setLoading(false)
    }

  return (
    <div>
      <div className='flex items-end justify-between my-2'>
        <label className='text-xs'>Summary</label>
        <Button onClick={generateSummaryFromAI} variant="outline" type="button" size="sm" className="border-primary text-primary flex gap-2">{loading ? <LoaderCircle className='animate-spin'/> :  <> <Brain className='h-4 w-4'/> Generate from AI </>}</Button>
      </div>
      <EditorProvider>
        <Editor value={value} onChange={(e) => {setValue(e.target.value); onRichTextEditorChange(e)}}>
        <Toolbar>
            <BtnUndo />
            <BtnRedo />
            <Separator />
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
            <BtnClearFormatting />
            <HtmlButton />
            <Separator />
            <BtnStyles />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  )
}

export default RichTextEditor