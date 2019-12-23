import {
  Badge,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/core";
import { CheckBox, DateTime, Number, Submit } from "@components/@core/formik";
import { axUpdateBatch } from "@services/batch.service";
import { BATCH_UPDATE } from "@static/events";
import { BATCH } from "@static/messages";
import notification, { NotificationType } from "@utils/notification.util";
import { Formik } from "formik";
import React, { useState } from "react";
import { useListener } from "react-gbus";
import { MdSave } from "react-icons/md";
import { Batch } from "types/traceability";
import * as Yup from "yup";

function BatchUpdateModal({ update }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [batch, setBatch] = useState({} as Batch);

  const batchUpdateForm = {
    validationSchema: Yup.object().shape({
      startTime: Yup.number().nullable(),
      fermentationEndTime: Yup.number().nullable(),
      dryingEndTime: Yup.number().nullable(),
      perchmentQuantity: Yup.number()
        .min(1)
        .max(batch.quantity)
        .nullable(),
      finalizeBatch: Yup.boolean()
    }),
    initialValues: {
      startTime: batch.startTime,
      fermentationEndTime: batch.fermentationEndTime,
      dryingEndTime: batch.dryingEndTime,
      perchmentQuantity: batch.perchmentQuantity || null,
      finalizeBatch: batch.isReadyForLot || false
    }
  };

  const handleOnSubmit = async (values, actions) => {
    try {
      const { success, data } = await axUpdateBatch({ ...values, id: batch.id });
      if (success) {
        update(data);
        onClose();
        notification(BATCH.UPDATED, NotificationType.Success);
      }
    } catch (e) {
      notification(e.message);
    }
    actions.setSubmitting(false);
  };

  useListener((b: Batch) => {
    setBatch(b);
    onOpen();
  }, BATCH_UPDATE);

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <Formik {...batchUpdateForm} enableReinitialize={true} onSubmit={handleOnSubmit}>
        {props => (
          <form onSubmit={props.handleSubmit}>
            <ModalContent>
              <ModalHeader>Update Batch #{batch && batch.id}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <DateTime
                  name="startTime"
                  label="Start Time"
                  defaultBlank={true}
                  isNow={true}
                  disabled={props.values.finalizeBatch}
                  nowDisabled={props.values.fermentationEndTime}
                  max={props.values.fermentationEndTime}
                />
                <DateTime
                  name="fermentationEndTime"
                  label="Fermentation Ended on"
                  defaultBlank={true}
                  isNow={true}
                  disabled={props.values.finalizeBatch || !props.values.startTime}
                  nowDisabled={props.values.dryingEndTime}
                  min={props.values.startTime}
                  max={props.values.dryingEndTime}
                />
                <DateTime
                  name="dryingEndTime"
                  label="Drying Ended on"
                  defaultBlank={true}
                  isNow={true}
                  disabled={props.values.finalizeBatch || !props.values.fermentationEndTime}
                  min={props.values.fermentationEndTime}
                />
                <Number
                  name="perchmentQuantity"
                  label="Perchment Quantity"
                  hint={true}
                  max={batch.quantity}
                  disabled={props.values.finalizeBatch}
                />
                <CheckBox
                  name="finalizeBatch"
                  label={
                    <span>
                      Ready for Lot <Badge variantColor="red">irreversible</Badge>
                    </span>
                  }
                  isDisabled={
                    batch.isReadyForLot ||
                    !(
                      props.values.startTime &&
                      props.values.fermentationEndTime &&
                      props.values.dryingEndTime &&
                      props.values.perchmentQuantity
                    )
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button mr={3} onClick={onClose}>
                  Close
                </Button>
                <Submit props={props} leftIcon={MdSave} isDisabled={batch.isReadyForLot}>
                  Save
                </Submit>
              </ModalFooter>
            </ModalContent>
          </form>
        )}
      </Formik>
    </Modal>
  );
}
export default BatchUpdateModal;